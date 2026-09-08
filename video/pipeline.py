"""
Builds a narrated course video from a beat script.

Nothing here runs in real time. Audio is synthesised first so every beat's exact
duration is known, then frames are dumped to match it, then ffmpeg muxes the two.
A busy machine makes the build slower and changes nothing about the output, which
is the whole reason this is not a screen recording.

    python pipeline.py lessons/mtm1511-week01.json
"""

import ctypes
import json
import math
import pathlib
import shutil
import subprocess
import sys
import time

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro
from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).parent
STUDIO = (HERE / "studio.html").as_uri()
OUT = HERE / "out"
KOKORO_DIR = pathlib.Path.home() / "kokoro"

CAPTURE_FPS = 15      # motion is captured here
OUTPUT_FPS = 30       # and duplicated up to here by ffmpeg
SAMPLE_RATE = 24000
GAP = 0.35            # silence between beats, so narration has a seam to breathe in
TYPE_BUDGET = 0.65    # typing may occupy this much of a beat, the rest holds still
GLIDE = 0.55          # seconds of camera movement when the focus jumps


def as_text(v):
    """Lesson files give multi-line code as a list of lines, which stays readable."""
    return "\n".join(v) if isinstance(v, list) else v


def below_normal_priority():
    """Leave the foreground alone. Rob may well be playing something."""
    try:
        ctypes.windll.kernel32.SetPriorityClass(
            ctypes.windll.kernel32.GetCurrentProcess(), 0x00004000)
    except Exception:
        pass


# --------------------------------------------------------------------------- audio

def synth(beats, voice, workdir):
    kok = Kokoro(str(KOKORO_DIR / "kokoro-v1.0.onnx"), str(KOKORO_DIR / "voices-v1.0.bin"))
    track, durations = [], []
    gap = np.zeros(int(SAMPLE_RATE * GAP), dtype=np.float32)
    for i, beat in enumerate(beats):
        samples, sr = kok.create(beat["say"], voice=voice, speed=1.0, lang="en-us")
        assert sr == SAMPLE_RATE, f"expected {SAMPLE_RATE} Hz, got {sr}"
        durations.append(len(samples) / sr + GAP)
        track.append(np.asarray(samples, dtype=np.float32))
        track.append(gap)
        print(f"  beat {i + 1}/{len(beats)}  {durations[-1]:5.1f}s", flush=True)
    wav = workdir / "narration.wav"
    sf.write(wav, np.concatenate(track), SAMPLE_RATE)
    return wav, durations


# --------------------------------------------------------------------------- video

class Camera:
    """Dumps jpegs and records how many CAPTURE_FPS slots each one occupies.

    Counting slots rather than seconds is deliberate. The concat demuxer quantises
    a `duration` directive to its own timebase and silently loses the remainder on
    every frame, which cost ten seconds across a twelve minute video. A repeated
    filename cannot be rounded.
    """

    def __init__(self, page, framedir):
        self.page, self.dir, self.n, self.entries = page, framedir, 0, []

    def shoot(self, slots=1):
        path = self.dir / f"f{self.n:06d}.jpg"
        self.page.screenshot(path=str(path), type="jpeg", quality=92)
        self.entries.append((path, max(1, int(slots))))
        self.n += 1

    def still(self, seconds):
        slots = round(seconds * CAPTURE_FPS)
        if slots > 0:
            self.shoot(slots)


def render(beats, durations, workdir):
    framedir = workdir / "frames"
    framedir.mkdir(parents=True, exist_ok=True)
    step = 1.0 / CAPTURE_FPS

    with sync_playwright() as p:
        browser = p.chromium.launch(args=["--force-device-scale-factor=1", "--hide-scrollbars"])
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        page.goto(STUDIO)
        page.wait_for_function("window.studio !== undefined")
        cam = Camera(page, framedir)

        for beat, dur in zip(beats, durations):
            spent = 0.0

            if "crumb" in beat:
                page.evaluate("t => studio.setCrumb(t)", beat["crumb"])

            if "file" in beat:
                f = beat["file"]
                page.evaluate(
                    "([n, t, o]) => studio.setFile(n, t, o)",
                    [f["name"], as_text(f.get("text", "")), {"plain": f.get("plain", False),
                                                             "label": f.get("label")}])
                page.wait_for_timeout(120)

            if "focus" in beat and "type" not in beat:
                a, b = beat["focus"]
                page.evaluate("([a, b]) => studio.glide(a, b)", [a, b])
                for _ in range(int(GLIDE * CAPTURE_FPS)):
                    cam.shoot(step)
                    spent += step

            if "type" in beat:
                base = page.evaluate("studio.text()")
                addition = as_text(beat["type"])
                budget = max(0.6, dur * TYPE_BUDGET - spent)
                frames = max(1, int(budget * CAPTURE_FPS))
                per_frame = math.ceil(len(addition) / frames)
                shown = 0
                while shown < len(addition):
                    shown = min(len(addition), shown + per_frame)
                    page.evaluate("([t, o]) => studio.setText(t, o)",
                                  [base + addition[:shown], {"typing": True}])
                    cam.shoot(step)
                    spent += step
                page.evaluate("([t, o]) => studio.setText(t, o)",
                              [base + addition, {"typing": False, "force": True}])
                if "focus" in beat:
                    a, b = beat["focus"]
                    page.evaluate("([a, b]) => studio.setFocus(a, b)", [a, b])
                page.wait_for_timeout(60)

            cam.still(dur - spent + beat.get("hold", 0.0))

        browser.close()
    return cam.entries


# --------------------------------------------------------------------------- captions

def srt(beats, durations, path):
    def stamp(t):
        h, rem = divmod(t, 3600)
        m, s = divmod(rem, 60)
        return f"{int(h):02d}:{int(m):02d}:{int(s):02d},{int((s % 1) * 1000):03d}"

    lines, clock, n = [], 0.0, 0
    for beat, dur in zip(beats, durations):
        spoken = dur - GAP
        # Split on sentence ends and share the beat's measured time out by length.
        parts = [p.strip() for p in beat["say"].replace("? ", "?\x00").replace("! ", "!\x00")
                 .replace(". ", ".\x00").split("\x00") if p.strip()]
        total = sum(len(p) for p in parts) or 1
        at = clock
        for part in parts:
            share = spoken * len(part) / total
            n += 1
            lines.append(f"{n}\n{stamp(at)} --> {stamp(at + share)}\n{part}\n")
            at += share
        clock += dur
    path.write_text("\n".join(lines), encoding="utf-8")


# --------------------------------------------------------------------------- mux

def mux(entries, wav, workdir, dest, seconds):
    manifest = workdir / "frames.txt"
    slots = sum(n for _, n in entries)
    tail = max(CAPTURE_FPS * 2, math.ceil(seconds * CAPTURE_FPS) - slots + CAPTURE_FPS)
    print(f"  frames cover {slots / CAPTURE_FPS:.2f}s against {seconds:.2f}s of audio",
          flush=True)
    with manifest.open("w", encoding="utf-8") as fh:
        for path, n in entries:
            fh.write(f"file '{path.as_posix()}'\n" * n)
        fh.write(f"file '{entries[-1][0].as_posix()}'\n" * tail)

    cmd = ["ffmpeg", "-y", "-hide_banner", "-loglevel", "error",
           "-f", "concat", "-safe", "0", "-r", str(CAPTURE_FPS), "-i", str(manifest),
           "-i", str(wav),
           "-c:v", "h264_nvenc", "-preset", "p5", "-cq", "23", "-pix_fmt", "yuv420p",
           "-r", str(OUTPUT_FPS),
           # Kokoro hands back 24 kHz mono. Shipping that straight to AAC produces a
           # file some players decline to play at all, so normalise to the levels
           # YouTube expects and resample to 48 kHz stereo. loudnorm must come first:
           # it resamples to 192 kHz internally, and anything before it gets undone.
           "-af", "loudnorm=I=-16:TP=-1.5:LRA=11,aresample=48000:resampler=soxr",
           "-ac", "2", "-ar", "48000", "-c:a", "aac", "-b:a", "160k",
           # -shortest is unreliable against the concat demuxer, which holds its final
           # frame open. Cut to the measured audio length instead.
           "-movflags", "+faststart", "-t", f"{seconds:.3f}", str(dest)]
    if subprocess.run(cmd).returncode != 0:
        print("  nvenc failed, falling back to libx264", flush=True)
        cmd[cmd.index("h264_nvenc")] = "libx264"
        cmd[cmd.index("-cq")] = "-crf"
        subprocess.run(cmd, check=True)


# --------------------------------------------------------------------------- main

def main(lesson_path):
    below_normal_priority()
    lesson = json.loads(pathlib.Path(lesson_path).read_text(encoding="utf-8"))
    beats = lesson["beats"]
    slug = f"{lesson['course'].lower()}-week{lesson['week']:02d}"
    workdir = OUT / slug
    if workdir.exists():
        shutil.rmtree(workdir)
    workdir.mkdir(parents=True)
    OUT.mkdir(exist_ok=True)

    t0 = time.time()
    print(f"{len(beats)} beats, voicing", flush=True)
    wav, durations = synth(beats, lesson.get("voice", "am_michael"), workdir)
    spoken = sum(durations)
    print(f"audio {spoken / 60:.1f} min in {time.time() - t0:.0f}s", flush=True)

    t1 = time.time()
    entries = render(beats, durations, workdir)
    print(f"{len(entries)} frames in {time.time() - t1:.0f}s", flush=True)

    mp4, subs = OUT / f"{slug}.mp4", OUT / f"{slug}.srt"
    srt(beats, durations, subs)
    t2 = time.time()
    mux(entries, wav, workdir, mp4, spoken)
    print(f"muxed in {time.time() - t2:.0f}s", flush=True)

    shutil.rmtree(workdir / "frames")
    size = mp4.stat().st_size / 1024 / 1024
    print(f"\n{mp4}  {spoken / 60:.1f} min  {size:.0f} MB")
    print(f"{subs}")
    print(f"total {(time.time() - t0) / 60:.1f} min")


if __name__ == "__main__":
    main(sys.argv[1])
