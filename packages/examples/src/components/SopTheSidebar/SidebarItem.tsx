import { defineComponent, nextTick, computed, type PropType } from 'vue';
import { ElMenuItem, ElSubMenu, type MenuItemClicked } from 'element-plus';
import { setMenuIndex, type SidebarListItem } from './SopTheSidebar';
import { useCustomRouter } from '../../composables/customRouter';
import { isURL } from '../../utils/index';


export const SidebarItem = defineComponent({
  name: 'SidebarItem',
  components: {
    ElMenuItem, ElSubMenu
  },
  props: {
    item: {
      type: Object as PropType<SidebarListItem>,
      required: true
    },
    index: {
      type: String,
      required: true
    }
  },
  emits: ['click-menu-item'],
  setup(props, { emit }) {
    const { router } = useCustomRouter();

    const item = computed(() => props.item);
    const menuIndex = ref(props.index);
    const disabled = computed(() => item.value.disabled !== undefined ? item.value.disabled : false);

    function menuClick(menuItem: MenuItemClicked) {
      const index = menuItem.index;

      emit('click-menu-item', index);
      if (isURL(index)) {
        nextTick(() => {
          window.open(index, '_blank');
        });
      } else {
        router.value?.push(index);
        menuIndex.value = index;
      }
    }

    function renderMenu() {
      if (!item.value.subMenu) {
        return <ElMenuItem
          index={menuIndex.value}
          disabled={disabled.value}
          onClick={menuClick}
        >
          <div class="menu-icon">{item.value.icon && item.value.icon}</div>
          <span>{item.value.title}</span>
        </ElMenuItem>;
      }

      if (item.value.subMenu && item.value.subMenu.length) {
        return (
          <ElSubMenu
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            index={`${menuIndex.value}` as any}
            disabled={disabled.value}
            popper-class="sub-menu__popper"
          >
            {{
              title: () => (
                <>
                  <div class="menu-icon">{item.value.icon}</div>
                  <span>{item.value.title}</span>
                </>
              ),
              default: () => (
                <>
                  {
                    item.value.subMenu &&
                    item.value.subMenu.map((i, idx) => <SidebarItem item={i} index={setMenuIndex(i, idx) || ''} />)
                  }
                </>
              )
            }}
          </ElSubMenu>
        );
      }
    }
    return () => (
      <>
        {renderMenu()}
      </>
    );
  },
});
