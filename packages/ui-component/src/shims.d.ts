/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentPublicInstance, FunctionalComponent } from 'vue';
import type { VNodeChild } from 'vue';

export type Recordable = Record<string, any>

declare global {
  namespace JSX {
    interface ElementChildrenAttribute {
      $children: any
    }
  }
}

declare module 'vue' {
  // import { ComponentOptions } from 'vue';
  // const componentOptions: ComponentOptions;
  export type JSXComponent<Props = any> = { new(): ComponentPublicInstance<Props> } | FunctionalComponent<Props>
  // export default componentOptions;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // export type JSXComponent<Props = any> = { new (): ComponentPublicInstance<Props> } | FunctionalComponent<Props>
}

declare module '@vue/runtime-dom' {
  export interface HTMLAttributes {
    $children?: VNodeChild
  }

  export interface SVGAttributes {
    $children?: VNodeChild
  }
}

// 组件类型导出
export type { HeaderOpts, SidebarOpts } from './components/SopLayoutMain/SopLayoutMain';
export type { SidebarListItem } from './components/SopTheSidebar/SopTheSidebar';
export type { StatusTypeEnum } from './components/SopStatus/SopStatus';
export type { CoverTypeEnum } from './components/SopCover/SopCover';
export type { OnOKEvent, DialogOrDrawerHeaderSlots } from './components/SopDialog/SopDialog';
export type { ComponentsType, TableColumn, TableConfig } from './components/SopBasicTable/SopBasicTable';
