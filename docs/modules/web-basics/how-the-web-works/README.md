---
title: How the Web Works
---

# How the Web Works

Every website involves two computers. A **client** is the machine making the request, which in this course means your browser on your laptop. A **server** is a machine somewhere else that stores the website's files and hands them out when asked. That's the entire relationship the web is built on, and everything else is detail on top of it.

The conversation between them follows a protocol called **<abbr title="Hypertext Transfer Protocol">HTTP</abbr>**, the HyperText Transfer Protocol. A protocol is just an agreed set of rules for how two machines talk, the same way a phone call has conventions about who speaks first. When you type an address into your browser, this happens:

1. Your browser sends an HTTP **request** to the server that owns that address, essentially asking "please send me this page."
2. The server finds the file and sends back an HTTP **response**, containing the HTML.
3. Your browser reads that HTML and renders it into the page you see.
4. If the HTML references other files, a stylesheet, images, fonts, the browser makes a separate request for each one and assembles the finished page as they arrive.

Written out, steps 1 and 2 look roughly like this:

```text
Request  ->  GET /about/team.html HTTP/1.1
             Host: example.com

Response <-  HTTP/1.1 200 OK
             Content-Type: text/html
             (the page's HTML follows)
```

`GET` is the request naming a specific file. `200 OK` is the server saying it found that file and here it is; you'll meet other status codes, `404` for a file that doesn't exist, once you're publishing real pages. The same exchange, drawn as the two machines actually involved:

<div class="diagram">
<svg viewBox="0 0 640 200" role="img" aria-label="A browser and a server exchanging an HTTP request and response. The browser sends a request naming a file. The server sends back a response containing that file's HTML. The browser then renders the page and makes separate requests for anything else it references.">
  <text x="130" y="24" text-anchor="middle" class="d-lbl">Browser (client)</text>
  <rect x="30" y="36" width="200" height="86" rx="8" class="d-surface d-border" stroke-width="1.5"/>
  <text x="130" y="84" text-anchor="middle" class="d-lbl-muted">your laptop</text>

  <text x="510" y="24" text-anchor="middle" class="d-lbl">Server</text>
  <rect x="410" y="36" width="200" height="86" rx="8" class="d-surface d-border" stroke-width="1.5"/>
  <text x="510" y="84" text-anchor="middle" class="d-lbl-muted">hosts the files</text>

  <line x1="230" y1="55" x2="410" y2="55" class="d-accent-stroke" stroke-width="2"/>
  <path d="M 400 49 L 410 55 L 400 61 Z" class="d-accent"/>
  <text x="320" y="45" text-anchor="middle" class="d-lbl-mono">1  request: GET /about/team.html</text>

  <line x1="410" y1="103" x2="230" y2="103" class="d-muted-stroke" stroke-width="2"/>
  <path d="M 240 97 L 230 103 L 240 109 Z" class="d-accent"/>
  <text x="320" y="120" text-anchor="middle" class="d-lbl-mono">2  response: 200 OK + team.html</text>

  <text x="320" y="160" text-anchor="middle" class="d-lbl-muted">3  browser renders the HTML</text>
  <text x="320" y="177" text-anchor="middle" class="d-lbl-muted">4  separate requests follow for images, styles, fonts</text>
</svg>
<figcaption>The same four steps from the list above, drawn as the exchange between the two machines. Steps 3 and 4 happen entirely on the browser's side, once the response arrives.</figcaption>
</div>

You'll see the **<abbr title="Hypertext Transfer Protocol Secure">HTTPS</abbr>** version almost everywhere now, which is the same protocol with the traffic encrypted so nobody in between can read or alter it. Browsers flag plain HTTP pages as not secure, and GitHub Pages serves your work over HTTPS automatically, so this is one thing you get for free.

Two pieces of vocabulary worth having straight. A **<abbr title="Uniform Resource Locator">URL</abbr>** is the full address of a resource, and its parts have names: in `https://example.com/about/team.html`, `https` is the protocol, `example.com` is the domain, and `/about/team.html` is the path to a specific file on that server. A second example, with different values, so the pattern reads as a pattern rather than something memorized from one instance:

```text
https://algonquincollege.com/programs/imm-webcourses.html
   |               |                        |
protocol         domain                    path
```

Same three parts, different address. The protocol and domain rarely change once a site is live; the path is what changes from page to page as you add more of them.

**<abbr title="Domain Name System">DNS</abbr>**, the Domain Name System, is the lookup service that turns a human-readable domain like `example.com` into the numeric address your browser actually connects to. You don't have to configure any of this, but knowing the pieces exist makes error messages far less mysterious later.

One consequence matters for this course specifically. Because the server just hands over files and the browser does the rendering, **the browser is the thing you're really writing for**. Two browsers can interpret the same file slightly differently, which is why testing your work in more than one is a habit worth building early.

## The checklist

Run this over your own understanding before you move on:

- Can explain what a client and a server each do, and what a request and a response are
- Can break a URL into its protocol, domain, and path
- Can explain what DNS does, in one sentence

## Keep learning

- [MDN: How the web works](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works). Mozilla's own short explanation of clients, servers, and what happens between typing an address and seeing a page.
