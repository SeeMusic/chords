import { nextTick } from 'vue';
import { describe, it, expect } from 'vitest';
import { shallowMount, mount } from '@vue/test-utils';
import { SopDataTable } from '../index';
import { SopDataTableItem } from '../../SopDataTableItem';

describe('SopDataTable', () => {

  it('render title', () => {
    const wrapper = shallowMount(SopDataTable, { props: { title: 'title' } });
    const title = wrapper.find('.sop-data-table__title').text();
    expect(title).toBe('title');
  });

  it('cols and gap', async () => {
    const wrapper = mount({
      components: {
        SopDataTable,
        SopDataTableItem
      },
      template: `
        <SopDataTable :cols="3" :gap="20">
          <SopDataTableItem v-for="item in 4" :key="item">{{ item }}</SopDataTableItem>
        </SopDataTable>
      `
    });

    await nextTick();
    const allItem = wrapper.findAll('.sop-data-table__content .sop-data-table-item');

    expect(allItem.length).toBe(4);
    // TODO allItem[0].attributes().style  with 为空 ???
    // expect(allItem[0].attributes().style).contain('20px');
  });
});
