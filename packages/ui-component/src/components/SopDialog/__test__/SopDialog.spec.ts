import { nextTick } from 'vue';
import { ElButton } from 'element-plus';
import { describe, it, expect } from 'vitest';
import { shallowMount, mount } from '@vue/test-utils';
import { SopDialog } from '../index';

describe('SopDialog', () => {

  it('no footer', () => {
    const wrapper = shallowMount({
      components: {
        SopDialog
      },
      template: `
        <SopDialog
          v-model:visible="visible"
          title="Tips"
          :is-show-footer="false"
        >
          this is message
        </SopDialog>
      `,
      data() {
        return { visible: true };
      }
    });
    const footer = wrapper.find('.el-dialog__footer');
    expect(footer.exists()).toBe(false);
  });

  it('submit', async () => {
    const wrapper = mount({
      components: {
        SopDialog,
        ElButton
      },
      template: `
        <ElButton @click="visible = true">
          modal
        </ElButton>
        <SopDialog
          v-model:visible="visible"
          title="Tips"
          is-show-default-footer
          @on-ok="(event) => event.close()"
          @on-close="() => console.log('close')"
        >
          This is modal content.
        </SopDialog>
      `,
      data() {
        return { visible: true };
      }
    });
    await nextTick();
    wrapper.find('.el-dialog .el-dialog__footer>:first-child').trigger('click');
    await nextTick();
    let dialog = wrapper.find('.el-overlay').attributes();
    expect(dialog.style).contain('display: none;');

    wrapper.find('.el-button').trigger('click');
    await nextTick();
    wrapper.find('.el-dialog .el-dialog__footer>:last-child').trigger('click');
    await nextTick();
    dialog = wrapper.find('.el-overlay').attributes();
    expect(dialog.style).contain('display: none;');
  });

  it('custom footer', async () => {
    const wrapper = mount({
      components: {
        SopDialog
      },
      template: `
        <SopDialog
          v-model:visible="visible"
          title="Tips"
        >
          This is modal content.
          <template #footer>
            custom content footer
          </template>
        </SopDialog>
      `,
      data() {
        return { visible: true };
      }
    });
    await nextTick();

    const text = wrapper.find('.el-dialog__footer').text();
    expect(text).toBe('custom content footer');
  });
});
