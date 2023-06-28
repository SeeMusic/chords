
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Icon } from '@iconify/vue';

import type { PropType } from 'vue';

export interface NavItemType {
  href?: string,
  title: string,
  iconClass: string,
  subNav: {
    title: string,
    href?: string,
    params?: {
      name?: string,
    },
  }[]
}

export default defineComponent({
  components: {
    Icon
  },
  props: {
    navList: {
      type: Array as PropType<NavItemType[]>,
      default: () => ([])
    }
  },
  setup(props) {
    const openedNavIndex = ref(0);

    function toggleNavGroup(index: number) {
      if (openedNavIndex.value === index) {
        openedNavIndex.value = -1;
      } else {
        openedNavIndex.value = index;
      }
    }

    function isNavActive(path: string | undefined) {
      return path?.indexOf(import.meta.env.BASE_URL) !== -1;
    }

    function setCurOpenNavIndex() {
      props.navList.forEach((item, index) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        item.subNav.forEach((nav: any) => {
          if (nav.href.indexOf(import.meta.env.BASE_URL) !== -1) {
            openedNavIndex.value = index;
            return;
          }
        });
      });
    }

    setCurOpenNavIndex();
    return {
      openedNavIndex,
      toggleNavGroup,
      isNavActive,
    };
  }
});
</script>

<template>
  <div class="the-sidebar">
    <ul>
      <li
        v-for="(navItem, index) in navList"
        :key="index"
        class="sd-aside__nav-group"
        :class="{
          'closed': index !== openedNavIndex,
        }"
      >
        <h2 @click="toggleNavGroup(index)">
          <Icon
            class="icon-ipo sd-aside__nav-group-icon"
            :icon="navItem.iconClass"
          />
          <a
            v-if="navItem.href"
            :href="navItem.href"
            target="_self"
            :class="{
              'router-link-exact-active': isNavActive(navItem.href),
            }"
          >
            {{ navItem.title }}
          </a>
          <span
            v-else
            class="sd-aside__nav-group-title"
          >
            {{ navItem.title }}
          </span>
          <Icon
            v-if="navItem.subNav.length"
            class="icon-ipo sd-icon-arrow-down"
            icon="icon-park-outline:down"
          />
        </h2>
        <ul>
          <li
            v-for="(subNavItem, subNavindex) in navItem.subNav"
            :key="subNavindex"
          >
            <a
              :href="subNavItem.href"
              target="_self"
              :class="{
                'router-link-exact-active': isNavActive(subNavItem.href),
              }"
            >
              {{ subNavItem.title }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

