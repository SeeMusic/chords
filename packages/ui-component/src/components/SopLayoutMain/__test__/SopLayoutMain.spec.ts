import { nextTick, h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { SopLayoutMain } from '../index';


const wrapper = mount({
  components: {
    SopLayoutMain
  },
  template: `
    <SopLayoutMain
      v-model:collapse="collapse"
      :headerOpts="{
        logo: 'https://pics.kanjian.com/favicon/kanjian-logo-blue@2x.png',
        subTitle: '副标题'
      }"
      :sidebarOpts="{
        menuList,
        collapseIcon
      }"
      @logo-click="() => console.log('click')"
    >
      <template #headerRightOpt>
        右侧内容区域
      </template>

      <template #main>
        <div class="container">主体内容区域</div>
      </template>
    </SopLayoutMain>
  `,
  data() {
    return {
      collapse: false,
      menuList: [
        {
          title: 'DSP管理',
          subMenu: [
            {
              title: '客户列表',
              path: '/dsp/customer'
            },
            {
              title: 'DSP/SP',
              path: '/dsp/channel'
            },
          ]
        },
        {
          title: '禁用测试',
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
              title: '禁用测试',
              path: '/musicverse/track',
            },
            {
              title: '外链测试',
              path: 'https://musichub.kanjian.com'
            }
          ]
        },
      ],
      collapseIcon: h('span', '收起'),
    };
  },
});

describe('SopLayoutMain', () => {
  it('collapse', async () => {
    wrapper.find('.collapse-container div').trigger('click');
    await nextTick();
    const attr = wrapper.find('.aside-collapse').attributes();
    expect(attr.class).contain('aside-collapse');
    // 还原
    wrapper.find('.collapse-container div').trigger('click');
    await nextTick();
  });

  it('should click emitted', () => {
    const logo = wrapper.find('.the-logo');
    const logoComp = wrapper.findComponent(SopLayoutMain);
    logo?.trigger('click');
    expect(logoComp.emitted()).toBeTruthy();
  });

  it('slot', () => {
    const slot = wrapper.find('.el-main .container').text();
    expect(slot).toBe('主体内容区域');
  });
});
