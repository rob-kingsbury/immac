<script setup>
// Replaces the theme's own VPSidebarItem.vue (aliased over
// @theme/VPSidebarItem.vue in config.js). Identical markup and styling. The
// one behavioural change that earns this file is `isFirstHeadingAtPageTop`
// below: marking a page's first heading active while route.hash is empty,
// which is the state the reader is in every time they open a module.
//
// HISTORY, because this file previously argued for itself on grounds that
// turned out to be false. It was written to fix #32 (the week rail drawing as
// a bare line with no heading nodes) on the theory that the stock component
// seeds `isOpen` once via `useToggle(isOpenDefault.value)` and only resyncs
// through its own `router.afterEach`, so an item created BY the navigation
// meant to activate it registers its hook too late to catch that same
// navigation. The race is real and the reasoning was sound, but it cannot
// fire here: every item that reaches this component is `collapsible: false`
// (config.js's discipline sidebars and course-structure.js's module children
// all set it so, and the one `collapsible: true` group -- a week -- is
// rendered by CourseSidebarItems.vue's own panel markup, never through this
// component). With collapsible false, `isOpenDefault` is unconditionally
// true and none of the isOpen machinery below does anything. #32's actual
// cause was elsewhere: module headings are scraped from the main pane's DOM
// a page-transition after the route commits, so the rail's watchers ran
// before the data existed. Fixed in 363c4b7.
//
// The collapsible/isOpen handling is kept rather than stripped because it is
// the theme's own contract for this component and would be needed the moment
// any module group is made collapsible. It is dormant, not wrong.

import { computed, ref, watch } from 'vue'
import { useRoute } from 'vuepress/client'

import { isActiveSidebarItem } from '@theme/isActiveSidebarItem'
import VPAutoLink from '@theme/VPAutoLink.vue'
import VPDropdownTransition from '@theme/VPDropdownTransition.vue'

const props = defineProps({
  item: { type: Object, required: true },
  depth: { type: Number, default: 0 },
  // Position among siblings. Only ever consulted for heading children, to
  // identify the first one -- see isFirstHeadingAtPageTop.
  index: { type: Number, default: 0 },
})

const route = useRoute()

const collapsible = computed(() => props.item.collapsible)
const isActive = computed(() => isActiveSidebarItem(props.item, route))

// A page's own headings appear in the sidebar as children whose `link` is a
// bare hash ('#the-checklist'), and the theme's isActiveSidebarItem marks one
// active on `route.hash === item.link` alone. Nothing else can match a bare
// hash, so when route.hash is empty NO heading is active.
//
// It is empty far more often than it looks. @vuepress/plugin-active-header-
// links (on by default, see the theme's `_.activeHeaderLinks??!0`) owns
// route.hash on this site, and its scroll handler does not merely fail to set
// a hash near the top of a page -- it actively CLEARS one, replacing the route
// with an empty hash whenever scrollY is within 5px of the top. So a reader
// who opens a module, or scrolls back up to re-read the opening, gets a
// sub-nav with nothing marked at all, even though they are demonstrably
// looking at the first section.
//
// Treating the first heading as active in that state says the true thing
// (you are at the top, which is where the first section is) and costs
// nothing: it is scoped to the one case where the theme's own answer is
// "none", so it can never override a real hash match.
const isFirstHeadingAtPageTop = computed(
  () =>
    props.index === 0 &&
    !route.hash &&
    typeof props.item.link === 'string' &&
    props.item.link.startsWith('#'),
)

const itemClass = computed(() => ({
  'vp-sidebar-item': true,
  'vp-sidebar-heading': props.depth === 0,
  'active': isActive.value || isFirstHeadingAtPageTop.value,
  'collapsible': collapsible.value,
}))

const isOpenDefault = computed(() => (collapsible.value ? isActive.value : true))

// null = follow isOpenDefault; true/false = the reader's own last click wins
// until isOpenDefault changes.
const manualOverride = ref(null)
const isOpen = computed(() => manualOverride.value ?? isOpenDefault.value)
watch(isOpenDefault, () => {
  manualOverride.value = null
})

const onClick = (event) => {
  if (collapsible.value) {
    event.preventDefault()
    manualOverride.value = !isOpen.value
  }
}
</script>

<template>
  <li>
    <VPAutoLink v-if="item.link" :class="itemClass" :config="item">
      <template #after>
        <span
          v-if="collapsible"
          class="arrow"
          :class="isOpen ? 'down' : 'right'"
        />
      </template>
    </VPAutoLink>
    <p
      v-else
      tabindex="0"
      :class="itemClass"
      @click="onClick"
      @keydown.enter="onClick"
    >
      {{ item.text }}
      <span
        v-if="collapsible"
        class="arrow"
        :class="isOpen ? 'down' : 'right'"
      />
    </p>

    <VPDropdownTransition v-if="'children' in item && item.children.length">
      <ul v-show="isOpen" class="vp-sidebar-children">
        <ReactiveSidebarItem
          v-for="(child, i) in item.children"
          :key="`${depth}${child.text}${child.link}`"
          :item="child"
          :depth="depth + 1"
          :index="i"
        />
      </ul>
    </VPDropdownTransition>
  </li>
</template>

<style lang="scss">
// The theme's own equivalent styling (VPSidebarItem.vue) pulls its
// `dropdown-wrapper` mixin and breakpoint variables in via `@use '../styles/
// mixins'` / `'../styles/variables'`, relative paths that only resolve from
// inside the theme's own package. This file lives in the project instead, so
// the one mixin actually used here (dropdown-wrapper: `overflow: hidden;
// transition: height 0.1s ease-out;`, see node_modules/@vuepress/theme-default/
// dist/client/styles/_mixins.scss) is inlined rather than reached for across
// a package boundary that Vite's sass resolution is not set up for -- the
// same approach CourseSidebarItems.vue already takes for its own styling.

.vp-sidebar-item {
  border-inline-start: 0.25rem solid transparent;
  color: var(--vp-c-text);
  cursor: default;

  &:focus-visible {
    outline-width: 1px;
    outline-offset: -1px;
  }

  &.vp-sidebar-heading {
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding-block: 0.35rem;
    padding-inline: 1.25rem 1.5rem;

    font-weight: bold;
    font-size: 1.1em;

    transition: color 0.15s ease;

    + .vp-sidebar-children {
      overflow: hidden;
      transition: height 0.1s ease-out;

      margin-bottom: 0.75rem;
    }
  }

  &.collapsible {
    cursor: pointer;
  }

  &:not(.vp-sidebar-heading) {
    display: inline-block;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding-block: 0.35rem;
    padding-inline: 2rem 1rem;

    font-weight: 400;
    font-size: 1em;
    line-height: 1.4;

    + .vp-sidebar-children {
      padding-inline-start: 1rem;
      font-size: 0.95em;
    }

    .vp-sidebar-children .vp-sidebar-children & {
      padding-block: 0.25rem;
      padding-inline: 1.75rem 1rem;

      &.active {
        border-inline-start-color: transparent;
        font-weight: 500;
      }
    }

    a.vp-sidebar-heading + .vp-sidebar-children &.active {
      border-inline-start-color: transparent;
    }
  }

  &.active:not(p.vp-sidebar-heading) {
    border-inline-start-color: var(--vp-c-accent);
    color: var(--vp-c-accent);
    font-weight: 600;
  }

  .auto-link {
    display: block;
  }

  &.auto-link {
    display: block;
    cursor: pointer;

    &:hover {
      color: var(--vp-c-accent);
    }
  }
}
</style>
