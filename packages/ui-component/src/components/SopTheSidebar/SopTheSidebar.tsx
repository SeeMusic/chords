import { defineComponent, ref, isVNode, computed, watch, type PropType, type VNode } from 'vue';
import { ElMenu, ElAside, ElScrollbar } from 'element-plus';
import { SidebarItem } from './SidebarItem';
import { useCustomRouter } from '../../composables/customRouter';

export interface SidebarListItem {
  /** 标题 */
  title: string,
  /** iconify 类名 */
  icon?: VNode,
  /** 外链 */
  href?: string,
  /** 内链 */
  path?: string
  // 是否禁用
  disabled?: boolean
  /** 子菜单 */
  subMenu?: SidebarListItem[]
}

/**
 * @description 设置 subMenu(索引) menu(链接) 的 index 属性
 * @param menu  SidebarListItem
 * @param index number
 * @returns string
 */
export function setMenuIndex(menu: SidebarListItem, index: number)   {
  if (!menu.path && !menu.href) {
    return `${index}`;
  }
  return menu.path ? menu.path : menu.href;
}

export default defineComponent({
  name: 'SopTheSidebar',
  components: {
    ElMenu, ElAside, ElScrollbar, SidebarItem
  },
  props: {
    width: {
      type: String,
      default: '256px'
    },
    menuList: {
      type: Array as PropType<SidebarListItem[]>,
      default: () => ([])
    },
    collapseIcon: {
      type: Object as PropType<VNode>,
      default: () => ({})
    },
    collapse: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:collapse'],
  setup(props, { attrs, emit }) {
    const { route } = useCustomRouter();
    const defaultActive = ref('');
    const menuList = ref(props.menuList);

    const isShowCollapseContainer = computed(() => props.collapseIcon && isVNode(props.collapseIcon));

    // fix: 页面内点击跳转后，菜单高亮无法跟随变动
    watch(
      () => route.value,
      () => {
        if (route.value) {
          /**
           * bug: 跳转到 /examples/child 时, /examples 对应的菜单高亮效果丢失。
           * routes
           * [
           *    { path: '/example' },
           *    /example/child 是否需要 /example 进行高亮显示
           *    { path: '/example/child }
           * ]
           *
           * menuList
           * [
           *    { title: '示例', path: '/example' }
           * ]
           *
           * 如果 VueRouter 的 routes 中配置了 meta.active 就以这个字段为准，如果没有就使用 path
           * TODO: 硬编码的方式解决以上问题, 期待更合适的解决方案。。。
           */
          if (route.value.meta && route.value.meta.active) {
            const active = route.value.meta.active as string;
            defaultActive.value = active;
          } else {
            if (route.value.path) {
              defaultActive.value = route.value.path;
            }
          }
        }
      },
      { deep: true, immediate: true }
    );

    return () => (
      <ElAside
        class={[props.collapse ? 'aside-collapse' : '', 'app-aside']}
        width={props.width}
      >
        <ElScrollbar height="calc(100vh - 64px)">
          <ElMenu
            {...attrs}
            mode="vertical"
            unique-opened
            menu-trigger="click"
            default-active={defaultActive.value}
            collapse={props.collapse}
            collapse-transition
            class={isShowCollapseContainer.value ? 'collapse-menu' : ''}
          >
            {
              menuList.value.map((menu, index) => {
                return <SidebarItem
                  item={menu}
                  index={setMenuIndex(menu, index) || ''}
                  onClick-menu-item={(menuIndex) => {
                    defaultActive.value = menuIndex;
                  }}
                />;
              })
            }
          </ElMenu>

        </ElScrollbar>

        {
          isShowCollapseContainer.value &&
          <div class="collapse-container">
            <div onClick={() => {
              emit('update:collapse', !props.collapse);
            }}>
              {props.collapseIcon}
            </div>
          </div>
        }
      </ElAside>
    );
  },
});

