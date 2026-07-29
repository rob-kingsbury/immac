<script setup>
// Replaces the theme's own VPSidebarItem.vue (aliased over @theme/VPSidebarItem.vue
// in config.js). Identical markup and styling; the only change is how `isOpen`
// (whether a collapsible group's children are shown) gets kept correct.
//
// The stock component (node_modules/@vuepress/theme-default/dist/client/components/
// VPSidebarItem.vue) seeds `isOpen` ONCE from `isOpenDefault` via
// `useToggle(isOpenDefault.value)` at setup time, then only ever corrects it
// later through `router.afterEach(() => nextTick().then(() => isOpen.value =
// isOpenDefault.value))`. That resync depends on this component's OWN
// afterEach callback already being registered before the navigation that is
// supposed to trigger it.
//
// Whenever a VPSidebarItem is freshly created as a direct reactive
// consequence of the very navigation that is meant to make it active --
// landing on a module in a week whose panel was not already open, or a cold
// page load -- its afterEach hook is registered too late to catch that same
// navigation's own afterEach dispatch (Vue Router updates `currentRoute` and
// runs afterEach guards before this component's setup(), which creates the
// hook, ever runs). `isOpen` is then stuck at whatever it snapshotted at
// creation until some LATER, unrelated navigation happens to fire afterEach
// again. On this site that later navigation is the theme's own scroll-spy
// (@vuepress/plugin-active-header-links, on by default, see node_modules/
// @vuepress/theme-default/dist/node/index.js -- `_.activeHeaderLinks??!0`),
// which replaces route.hash 300ms after the reader stops scrolling. That is
// the mechanism behind issue #32: CourseSidebarItems.vue's drawWeekRail()
// measures the active module's own heading list to draw the branched rail,
// and finds it collapsed (isOpen still false) until whatever navigation
// happens to come along next resyncs it -- which is why the rail flashes as
// a plain line with no circles for however long it takes the reader to
// scroll, not a fixed delay.
//
// Making `isOpen` a plain reactive computed over `isOpenDefault` removes the
// afterEach/nextTick race entirely: there is no separate event to miss,
// because Vue's own reactivity keeps it current in the same flush that
// updates the route. A manual toggle still has to win over the route-driven
// default -- a reader who closes an open group should not have it spring
// back open on the next unrelated scroll-hash update -- so an explicit
// override is kept, but it only resets when `isOpenDefault` itself changes
// (this item's own active state actually changed), not on every navigation
// regardless of relevance. That is a deliberate, minor difference from the
// stock component: a manually-opened INACTIVE group can now survive an
// unrelated navigation elsewhere instead of auto-collapsing on it, which is
// the trade-off for no longer depending on router.afterEach at all.

import { computed, ref, watch } from 'vue'
import { useRoute } from 'vuepress/client'

import { isActiveSidebarItem } from '@theme/isActiveSidebarItem'
import VPAutoLink from '@theme/VPAutoLink.vue'
import VPDropdownTransition from '@theme/VPDropdownTransition.vue'

const props = defineProps({
  item: { type: Object, required: true },
  depth: { type: Number, default: 0 },
})

const route = useRoute()

const collapsible = computed(() => props.item.collapsible)
const isActive = computed(() => isActiveSidebarItem(props.item, route))
const itemClass = computed(() => ({
  'vp-sidebar-item': true,
  'vp-sidebar-heading': props.depth === 0,
  'active': isActive.value,
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
          v-for="child in item.children"
          :key="`${depth}${child.text}${child.link}`"
          :item="child"
          :depth="depth + 1"
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
