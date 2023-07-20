import { defineComponent, type PropType, type VNode } from 'vue';
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
          <SopTheSidebar
            {...props.sidebarOpts}
            collapse={props.collapse}
            onUpdate:collapse={() => {
              emit('update:collapse', !props.collapse);
            }}
          />
          <ElMain>
            {slots.main?.()}
          </ElMain>
        </ElContainer>
      </ElContainer>
    );
  },
});
