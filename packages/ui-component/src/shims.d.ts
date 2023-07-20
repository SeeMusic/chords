/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentPublicInstance, FunctionalComponent } from 'vue';
import type { VNodeChild } from 'vue';

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
  export type JSXComponent<Props = any> = { new (): ComponentPublicInstance<Props> } | FunctionalComponent<Props>
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

// declare module '*.vue' {
//   // import { ComponentOptions } from 'vue';
//   // const componentOptions: ComponentOptions;
//   export type JSXComponent<Props = any> = { new (): ComponentPublicInstance<Props> } | FunctionalComponent<Props>
//   // export default componentOptions;
// }


export { HeaderOpts, SidebarOpts } from './components/SopLayoutMain/SopLayoutMain';
export { SidebarListItem } from './components/SopTheSidebar/SopTheSidebar';
