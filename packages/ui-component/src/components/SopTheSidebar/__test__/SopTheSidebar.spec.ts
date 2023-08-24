import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { SopTheSidebar } from '../index';
import { SidebarItem } from '../SidebarItem';
import { ComponentCustomProperties, h, nextTick } from 'vue';
import { RouteLocationNormalizedLoaded, createRouter, createWebHistory } from 'vue-router';

const _mount = (template: string, options = {}) =>
  mount({
    components: {
      SopTheSidebar,
      SidebarItem
    },
    template,
    ...options,
  });

const sidebar = _mount(
  `<SopTheSidebar
    v-model:collapse="collapse"
    :menu-list="menuList"
    :collapse-icon="collapseIcon"
  />`, {
  data() {
    return {
      collapse: false,
      collapseIcon: h('span', '收起'),
      menuList: [
        {
          title: 'DSP管理',
          path: '/dsp/customer'
        },
        {
          title: 'menu禁用测试',
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
          subMenu: [
            {
              title: 'submenu禁用测试',
              path: '/musicverse/track',
              disabled: true
            },
            {
              title: '外链测试',
              path: 'https://musichub.kanjian.com'
            },
            {
              title: '三级菜单',
              subMenu: [
                {
                  title: '三级菜单1',
                  path: '/thirdMenu',
                }
              ]
            }
          ]
        },
      ]
    };
  }
}
);

describe('menu', () => {
  it('rendering menu-item', () => {
    const firstMenu = sidebar.findAll('.el-menu-item > span')?.at(0);
    expect(firstMenu?.text()).toEqual('DSP管理');
    const secondMenu = sidebar.findAll('.el-sub-menu')?.at(0);
    expect(secondMenu?.find('span').text()).toEqual('menu禁用测试');
  });
  it('menu-item disabled', () => {
    const secondMenu = sidebar.findAll('.el-sub-menu')?.at(0);
    expect(secondMenu?.classes()).toContain('is-disabled');
  });
});

describe('sub-menu', () => {
  it('rendering sub-menu item', () => {
    const thirdMenu = sidebar.findAll('.el-sub-menu')?.at(1);
    expect(thirdMenu?.findAll('.el-menu-item > span').map((node) => node.text())).toEqual(['submenu禁用测试', '外链测试', '三级菜单1']);
    expect(thirdMenu?.findAll('.el-sub-menu__title> span').map((node) => node.text())).toEqual(['曲库管理', '三级菜单']);
  });
  it('sub-menu-item disabled', () => {
    const thirdMenu = sidebar.findAll('.el-sub-menu')?.at(1);
    expect(thirdMenu?.findAll('.el-menu-item')?.at(0)?.classes()).toContain('is-disabled');

  });
});

// todo: router test
// describe('router mount', () => {
//   const router = createRouter({
//     history: createWebHistory(),
//     routes: [
//       { path: '/dsp/customer', component: SopTheSidebar }
//     ]
//   });
//   const _sidebar = mount(
//     { template: `<SopTheSidebar
//     :menu-list="menuList"
//   />` }, {
//       components: {
//         SopTheSidebar
//       },
//       data() {
//         return {
//           menuList: [
//             {
//               title: 'DSP管理',
//               path: '/dsp/customer'
//             },
//             {
//               title: '曲库管理',
//               path: '/musicverse/track'
//             }
//           ]
//         };
//       },
//       global: {
//         // plugins: [router],
//         // router
//         mocks: {
//           $route: {
//             path: '/dsp/customer'
//           }
//         }
//         // config: {
//         //   globalProperties: {
//         //   },
//         // }
//       },

//       router
//     }
//   );
//   it.only('first menu active', () => {
//     console.log('********', _sidebar.vm);
//     expect(_sidebar.vm.$route).to.be.an('object');
//     const menus = _sidebar.findAll('.el-menu-item');
//     expect(menus?.map(node => node.text()).filter(o => o)).toEqual(['DSP管理', '曲库管理']);
//     const firstMenu = _sidebar.findAll('.el-menu-item')?.at(0);
//     expect(firstMenu?.classes()).toContain('is-active');
//   });
// });

describe('menu click', () => {
  it('change active', async () => {
    const firstMenu = sidebar.findAll('.el-menu-item')?.at(0);
    expect(firstMenu?.classes()).not.toContain('is-active');
    await firstMenu?.trigger('click');
    expect(firstMenu?.classes()).toContain('is-active');
  });

  it('should emitted', async () => {
    const firstMenu = sidebar.findComponent(SidebarItem);
    firstMenu?.trigger('click');
    expect(firstMenu?.emitted('click-menu-item')).toBeTruthy();
    expect(firstMenu?.emitted('click-menu-item')?.[0][0]).toEqual('/dsp/customer');
  });
});

describe('expand & collapse', () => {
  const collapseContainer = sidebar.find('.collapse-container');
  it('render', () => {
    expect(collapseContainer.exists()).toBe(true);
  });
  it('click', async () => {
    await collapseContainer.find('div').trigger('click');
    expect(sidebar.vm.collapse).toBe(true);
    await collapseContainer.find('div').trigger('click');
    expect(sidebar.vm.collapse).toBe(false);
  });
});
