import { h } from 'vue';
import { Icon } from '@iconify/vue';
import type { VNode } from 'vue';

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
  activePath?: string
  /** 子菜单 */
  subMenu?: SidebarSubListItem[]
}

export type SidebarSubListItem = Pick<SidebarListItem, 'title' | 'icon' | 'href' | 'subMenu' | 'path' | 'disabled'>

export const navList: SidebarListItem[] =
  [
    {
      title: '示例',
      icon: h(Icon, { icon: 'icon-park-twotone:components' }),
      subMenu: [
        {
          title: 'Example',
          path: '/examples',
        },
      ]
    },
    {
      title: 'BasicTable',
      icon: h(Icon, { icon: 'material-symbols:table-view-sharp' }),
      path: '/example-table'
    },
    {
      title: 'ConfigProvider',
      icon: h(Icon, { icon: 'material-symbols:table-view-sharp' }),
      path: '/example-config-provider'
    }
  ];
