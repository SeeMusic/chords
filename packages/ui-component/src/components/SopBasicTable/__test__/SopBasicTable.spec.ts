import { nextTick } from 'vue';
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SopBasicTable from '../SopBasicTable';

const _mount = (template: string, options = {}) =>
  mount({
    components: {
      SopBasicTable,
    },
    template,
    ...options,
  });

const wrapper = _mount(
  `
    <SopBasicTable
      :columns="tableColumns"
      :config="tableConfig"
      :data="tableData"
      @current-change="(pageNum) => {
        tableConfig.pagination.currentPage = pageNum;
      }"
      @edit-column-change="(event) => editedData"
    >
      <template #date="{ row }">
        <div class="slot-content">
          this is slot content
        </div>
      </template>
    </SopBasicTable>
  `,
  {
    data() {
      return {
        tableConfig: {
          isPagination: true,
          pagination: {
            currentPage: 2,
            pageSize: 20,
            total: 100
          }
        },
        tableColumns: [
          { customRender: 'date', label: '日期' },
          {
            prop: 'name',
            label: '名称',
            editable: true,
            editColumn: true,
            editComponent: 'ElInput',
          },
          {
            prop: 'address',
            label: '地址',
            editable: true,
            editRow: true,
            editComponent: 'ElInput',
            editComponentProps: {
              size: 'small'
            }
          }
        ],
        tableData: [
          {
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
        ],
        editedData: {}
      };
    }
  }
);

describe('basic table', () => {
  it('header', () => {
    const headers = wrapper.findAll('thead tr th .cell').map(i => i.text());
    expect(headers).toEqual(['日期', '名称', '地址']);
  });

  it('row length', () => {
    const rowLength = wrapper.findAll('tbody tr').length;
    expect(rowLength).toBe(4);
  });
});

describe('slot and pagination', () => {
  it('slot', () => {
    const slotText =
      wrapper.findAll('.el-table__body-wrapper .el-table__row :first-child .cell .slot-content')[0].text();
    expect(slotText).toBe('this is slot content');
  });

  it('pagination', () => {
    wrapper.find('li[aria-label="page 4"]').trigger('click');
    nextTick(() => {
      const active = wrapper.find('.el-pager .is-active').text();
      expect(active).toEqual('4');
    });
  });
});

describe('edit column', () => {
  it('head edit flag', () => {
    const nameHead = wrapper.findAll('thead tr th .cell')[1];
    const nameEditFlag = nameHead.find('svg');
    expect(nameEditFlag.element.tagName).toBe('SVG');
  });

  it('click row edit flag', () => {
    const cell =
      wrapper.findAll('.el-table__body-wrapper .el-table__row :nth-child(2) .cell')[0];

    cell.find('svg').trigger('click');
    nextTick(() => {
      const editCell = cell.find('.el-input input').element.tagName;
      expect(editCell).toBe('INPUT');
    });
  });
});
