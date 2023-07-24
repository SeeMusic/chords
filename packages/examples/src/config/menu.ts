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
  /** 子菜单 */
  subMenu?: SidebarSubListItem[]
}

export type SidebarSubListItem = Pick<SidebarListItem, 'title' | 'icon' | 'href' | 'subMenu' | 'path' | 'disabled'>

export const navList: SidebarListItem[] =
  [
    {
      title: '组件',
      icon: h(Icon, { icon: 'icon-park-twotone:components' }),
      subMenu: [
        {
          title: 'SuperForm',
          path: '/super-form'
        },
        {
          title: 'SuperTable',
          path: '/super-table'
        },
        {
          title: 'Modal',
          path: '/modal'
        },
        {
          title: 'Drawer',
          path: '/drawer'
        },
      ]
    },
    {
      title: 'DSP管理',
      icon: h(Icon, { icon: 'ph:git-branch-fill' }),
      subMenu: [
        {
          title: '客户列表',
          path: '/dsp/customer'
        },
        {
          title: 'DSP/SP',
          path: '/dsp/channel'
        },
        {
          title: '项目列表',
          path: '/dsp/project'
        },
        {
          title: '传输链路',
          path: '/dsp/transmit-link'
        },
        {
          title: '虚拟链路',
          path: '/dsp/virtual-link'
        }
      ]
    },
    {
      title: '合同管理',
      icon: h(Icon, { icon: 'ph:scroll-fill' }),
      disabled: true,
      subMenu: [
        {
          title: '合同列表',
          path: '/contract/'
        }
      ]
    },
    {
      title: '曲库管理',
      icon: h(Icon, { icon: 'icon-park-outline:music' }),
      subMenu: [
        {
          title: '曲库列表',
          path: '/musicverse/track'
        },
        {
          title: '曲库 Music hub',
          path: 'https://musichub.kanjian.com'
        }
      ]
    },
    {
      title: '歌单管理',
      icon: h(Icon, { icon: 'ph:playlist-fill' }),
      subMenu: [
        {
          title: '歌单管理',
          path: '/playlist/playlist/',
          disabled: true
        },
        {
          title: '交付管理',
          path: '/playlist/deliverable/'
        },
        {
          title: '分类管理',
          path: '/playlist/category/'
        }
      ]
    },
    {
      title: '发行管理',
      icon: h(Icon, { icon: 'icon-park-outline:send' }),
      subMenu: [
        {
          title: '专辑发行配置',
          path: '/release/album'
        }
      ]
    },
    {
      title: '审核管理',
      icon: h(Icon, { icon: 'icon-park-outline:ticket' }),
      subMenu: [
        {
          title: 'SOP 管理',
          path: 'https://sop.kanjian.com'
        }
      ]
    },
    {
      title: '版权管理',
      icon: h(Icon, { icon: 'icon-park-outline:dashboard' }),
      subMenu: [
        {
          title: '版权管理后台',
          path: 'https://star-admin.kanjian.com'
        },
        {
          title: 'CP管理（新版权后台）',
          path: 'https://star-admin.kanjian.com/v2/cp'
        }
      ]
    },
    {
      title: '角色和权限',
      icon: h(Icon, { icon: 'ph:users-fill' }),
      subMenu: [
        {
          title: '账号管理',
          path: '/user-center/account'
        },
        {
          title: '角色管理',
          path: '/user-center/role'
        },
        {
          title: '权限管理',
          path: '/user-center/permissions'
        }
      ]
    },
    {
      title: '测试管理',
      icon: h(Icon, { icon: 'ph:scroll-fill' }),
      path: '/test/user',
    },
    {
      title: '外链测试',
      icon: h(Icon, { icon: 'ph:scroll-fill' }),
      path: 'https://www.baidu.com',
    },
  ];
