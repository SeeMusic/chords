import { nextTick } from 'vue';
import { describe, it, expect } from 'vitest';
import { shallowMount, mount } from '@vue/test-utils';
import { SopDataTableItem } from '../index';

describe('SopDataTableItem', () => {

  it('render no border', () => {
    const wrapper = shallowMount(SopDataTableItem, { props: { border: false } });
    const borderStyle = wrapper.find('.sop-data-table-item').attributes();
    expect(borderStyle.class).contain('sop-data-table-item--no-border');
  });

  it('render label', () => {
    const wrapper = shallowMount(SopDataTableItem, { props: { label: 'label' } });
    const text = wrapper.find('.sop-data-table-item__label').text();
    expect(text).toBe('label');
  });

  it('render slot', async () => {
    const wrapper = mount({
      components: {
        SopDataTableItem
      },
      template: `
        <SopDataTableItem label="label">
          <template #opt>
            <a href="#" class="highlight">action</a>
          </template>
          content
        </SopDataTableItem>
      `
    });
    await nextTick();

    const label = wrapper.find('.sop-data-table-item__label .sop-data-table-item__opt').text();
    const content = wrapper.find('.sop-data-table-item__content').text();
    expect(label).toBe('action');
    expect(content).toBe('content');
  });
});
