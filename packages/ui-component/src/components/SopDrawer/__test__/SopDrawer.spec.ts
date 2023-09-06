import { nextTick } from 'vue';
import { ElButton } from 'element-plus';
import { describe, it, expect } from 'vitest';
import { shallowMount, mount } from '@vue/test-utils';
import { SopDrawer } from '../index';

describe('SopDrawer', () => {

  it('no footer', () => {
    const wrapper = shallowMount({
      components: {
        SopDrawer
      },
      template: `
        <SopDrawer
          v-model:visible="visible"
          title="Tips"
          :is-show-footer="false"
        >
          this is message
        </SopDrawer>
      `,
      data() {
        return { visible: true };
      }
    });
    const footer = wrapper.find('.el-drawer__footer');
    expect(footer.exists()).toBe(false);
  });

  it('submit', async () => {
    const wrapper = mount({
      components: {
        SopDrawer,
        ElButton
      },
      template: `
        <ElButton @click="visible = true">
          modal
        </ElButton>
        <SopDrawer
          v-model:visible="visible"
          title="Tips"
          is-show-default-footer
          @on-ok="(event) => event.close()"
          @on-close="() => console.log('close')"
        >
          This is modal content.
        </SopDrawer>
      `,
      data() {
        return { visible: true };
      }
    });
    await nextTick();
    wrapper.find('.el-drawer .el-drawer__footer>:first-child').trigger('click');
    await nextTick();
    let drawer = wrapper.find('.el-overlay').attributes();
    expect(drawer.style).contain('display: none;');

    wrapper.find('.el-button').trigger('click');
    await nextTick();
    wrapper.find('.el-drawer .el-drawer__footer>:last-child').trigger('click');
    await nextTick();
    drawer = wrapper.find('.el-overlay').attributes();
    expect(drawer.style).contain('display: none;');
  });

  it('custom footer', async () => {
    const wrapper = mount({
      components: {
        SopDrawer
      },
      template: `
        <SopDrawer
          v-model:visible="visible"
          title="Tips"
        >
          This is modal content.
          <template #footer>
            custom content footer
          </template>
        </SopDrawer>
      `,
      data() {
        return { visible: true };
      }
    });
    await nextTick();

    const text = wrapper.find('.el-drawer__footer').text();
    expect(text).toBe('custom content footer');
  });
});
