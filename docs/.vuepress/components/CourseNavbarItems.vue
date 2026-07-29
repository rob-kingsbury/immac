<script setup>
// Replaces the theme's navbar item list (aliased over @theme/VPNavbarItems.vue
// in config.js). Two changes from the stock version:
//
// 1. The static MTM1511 / MTM1544 links are gone from config.js entirely. A
//    reader is in one course; offering both at the top of every page invites
//    wandering into the wrong one, and the course sidebar already establishes
//    which course a course page or a placed module belongs to.
//
// 2. "Home" is computed per route instead of being a static link to the site
//    root. Reusing useSidebarItems() rather than inventing a second
//    route-to-course lookup: config.js already keys every course page and
//    every placed module's directory to that course's sidebar array (see
//    placedModuleSidebars in config.js), and courseSidebar() in
//    course-structure.js already puts a { text: 'Course Home', link:
//    '/<course>/' } entry first in that array. So "does the current page
//    belong to a course, and which one" is just "does the resolved sidebar
//    have a Course Home item" -- the same resolution CourseSidebarItems.vue
//    already relies on, not a second source of truth. A page with no course
//    context (the site home, the glossary, the module pool index, a module
//    placed in no week) has no such item, and falls back to the real site
//    root.

import { computed, ref } from 'vue'

import { useData } from '@theme/useData'
import { useNavbarConfig } from '@theme/useNavbarConfig'
import { useNavbarRepo } from '@theme/useNavbarRepo'
import { useNavbarSelectLanguage } from '@theme/useNavbarSelectLanguage'
import { useSidebarItems } from '@theme/useSidebarItems'
import { DeviceType, useUpdateDeviceStatus } from '@theme/useUpdateDeviceStatus'
import VPAutoLink from '@theme/VPAutoLink.vue'
import VPNavbarDropdown from '@theme/VPNavbarDropdown.vue'

const { themeLocale } = useData()
const navbarConfig = useNavbarConfig()
const navbarSelectLanguage = useNavbarSelectLanguage()
const navbarRepo = useNavbarRepo()
const sidebarItems = useSidebarItems()

const isMobile = ref(false)

const navbarLabel = computed(
  () => themeLocale.value.navbarLabel ?? 'site navigation',
)

const homeItem = computed(() => {
  const courseHome = sidebarItems.value.find((item) => item.text === 'Course Home')
  return courseHome ? { text: 'Course Home', link: courseHome.link } : { text: 'Home', link: '/' }
})

const navbarLinks = computed(() => [
  homeItem.value,
  ...navbarConfig.value,
  ...navbarSelectLanguage.value,
  ...navbarRepo.value,
])

useUpdateDeviceStatus(
  DeviceType.Mobile,
  (mobileDesktopBreakpoint) => {
    // avoid overlapping of long title and long navbar links
    isMobile.value = window.innerWidth < mobileDesktopBreakpoint
  },
)
</script>

<template>
  <nav
    v-if="navbarLinks.length"
    class="vp-navbar-items"
    :aria-label="navbarLabel"
  >
    <div v-for="item in navbarLinks" :key="item.text" class="vp-navbar-item">
      <VPNavbarDropdown
        v-if="'children' in item"
        :class="{ mobile: isMobile }"
        :config="item"
      />
      <VPAutoLink v-else :config="item" />
    </div>
  </nav>
</template>

<style lang="scss">
@use '@vuepress/theme-default/styles/variables' as *;

.vp-navbar-items {
  display: inline-block;

  @media print {
    display: none;
  }

  .auto-link {
    color: inherit;
    line-height: 1.4rem;

    &:hover,
    &.route-link-active {
      color: var(--vp-c-text);
    }
  }
}

.vp-navbar-item {
  position: relative;
  display: inline-block;
  margin-inline-start: 1.5rem;
  line-height: var(--navbar-line-height);

  @media (max-width: $MQMobile) {
    margin-inline-start: 0;
  }

  &:first-child {
    margin-inline-start: 0;
  }

  .auto-link {
    &:hover,
    &.route-link-active {
      color: var(--vp-c-accent);
    }
  }

  > .auto-link {
    display: inline-block;

    &:hover,
    &.route-link-active {
      margin-bottom: -2px;
      border-bottom: 2px solid var(--vp-c-accent);

      @media (max-width: $MQMobile) {
        margin-bottom: 0;
        border-bottom: none;
      }
    }
  }
}
</style>
