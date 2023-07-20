import { defineComponent, ref, isVNode, computed, type PropType, type VNode } from 'vue';
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
export function menuIndex(menu: SidebarListItem, index: number)   {
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
    const defaultActive = ref(route.value?.path);
    const menuList = ref(props.menuList);

    const isShowCollapseContainer = computed(() => props.collapseIcon && isVNode(props.collapseIcon));

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
                  index={menuIndex(menu, index) || ''}
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

