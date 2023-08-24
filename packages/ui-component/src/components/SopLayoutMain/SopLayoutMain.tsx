import { defineComponent, ref, type PropType, type VNode, watch } from 'vue';
import { ElContainer, ElHeader, ElMain } from 'element-plus';
import { SopTheHeader } from '../index';
import { SopTheSidebar } from '../index';
import type { SidebarListItem } from '../../shims';

export interface HeaderOpts {
  logo?: string
  subTitle?: string
}

export interface SidebarOpts {
  width?: string
  menuList?: SidebarListItem[]
  collapseIcon?: VNode,
  collapse?: boolean
}

export default defineComponent({
  name: 'SopLayoutMain',
  props: {
    headerOpts: {
      type: Object as PropType<HeaderOpts>,
      default: () => ({})
    },
    sidebarOpts: {
      type: Object as PropType<SidebarOpts>,
      default: () => ({})
    },
    collapse: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:collapse', 'logo-click'],
  setup(props, { slots, emit }) {
    const sidebarRef = ref<InstanceType<typeof SopTheSidebar> | null>(null);
    const sidebarWidth = ref('256px');
    //todo: 监听不到变化的原因
    // watch(sidebarRef, (newValue) => {
    //   const _sidebarRef = (sidebarRef as unknown as Ref<HTMLElement>);
    //   console.log('sidebarRef', newValue);
    //   console.log('width',useElementSize(_sidebarRef).width.value);
    // }, { deep: true });
    watch(() => sidebarRef.value?.collapse, (newValue) => {
      if (sidebarRef.value?.width) {
        sidebarWidth.value = newValue ? '64px': sidebarRef.value.width;
      }
    });
    return () => (
      <ElContainer class='app-layout-main'>
        <ElHeader>
          <SopTheHeader
            {...props.headerOpts}
            onLogo-click={() => {
              emit('logo-click');
            }}
          >
            {{
              rightOpt: () => slots.headerRightOpt?.()
            }}
          </SopTheHeader>
        </ElHeader>
        <ElContainer>
          <div class='app-layout-sidebar' style={{ width: sidebarWidth.value }}>
            <SopTheSidebar
              ref={sidebarRef}
              {...props.sidebarOpts}
              collapse={props.collapse}
              onUpdate:collapse={() => {
                emit('update:collapse', !props.collapse);
              }}
            />
          </div>
          <ElMain>
            {slots.main?.()}
          </ElMain>
        </ElContainer>
      </ElContainer>
    );
  },
});
