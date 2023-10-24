/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, ref } from 'vue';
import { ElTable, ElTableColumn } from 'element-plus';
import { Icon } from '@iconify/vue';
import EditTableCell from './EditTableCell.vue';
import { SopPagination } from '../SopPagination';
import { extend } from '../../utils';
import type { PropType, VNode } from 'vue';
import type { Column, PaginationProps } from 'element-plus';
import type { Recordable } from '../../shims';


export type ComponentsType = 'ElInput' |
  'ElInputNumber' |
  'ElSelect' |
  'ElSwitch' |
  'ElTimeSelect' |
  'ElTimePicker' |
  'ElSelectV2' |
  'ElDatePicker' |
  'ElCascader'

export interface TableColumn extends Omit<Column, 'width'> {
  prop?: string
  customRender?: string
  // custom 值等于 render 时传入 render 生效，否则它的值就被视为 slot
  render?: (scope: Recordable) => VNode
  // 表头的名称
  label?: string
  // cell 的类型
  type?: 'index' | 'selection' | 'expand'
  // cell 的宽度
  width?: string | number
  // 当 prop 对应的值为空时，则显示此内容
  placeholder?: string

  // 表格编辑开关
  editable?: boolean
  // 编辑行
  editRow?: boolean
  // 编辑列
  editColumn?: boolean
  editColumnScheduler?: () => Promise<boolean>
  // 是否必填
  editRule?: boolean
  editComponent?: ComponentsType
  editComponentProps?: Recordable
}

export interface TableConfig {
  // 是否开启分页
  isPagination?: boolean
  pagination: Partial<PaginationProps>
}

export default defineComponent({
  name: 'SopBasicTable',
  components: { ElTable, ElTableColumn, EditTableCell },
  props: {
    columns: {
      type: Object as PropType<TableColumn[]>,
      required: true
    },
    data: {
      type: Array as PropType<Recordable[]>,
      required: true
    },
    config: {
      type: Object as PropType<TableConfig>,
      default: () => {
        return {
          isPagination: true,
        };
      }
    }
  },
  emits: ['edit-column-change', 'current-change', 'size-change'],
  setup(props, { attrs, slots, emit, expose }) {
    const tableRef = ref<InstanceType<typeof ElTable> | null>(null);
    const editRowIndex = ref<number | null>(null);
    const isCancelEditRow = ref(false);

    const cancelEdit = () => isCancelEditRow.value = true;
    const getEditRowIndex = () => editRowIndex.value;

    /**
     * 设置当前被编辑行的索引
     */
    function setEditRowIndex(idx: number | number) {
      editRowIndex.value = idx;
      // !防止用户频繁调用 cancelEdit 方法
      isCancelEditRow.value = false;
    }

    const headerSlot = slots.header ? { header: (scope: Recordable) => slots.header?.(scope) } : {};

    /**
     * 默认要被渲染的 column
     */
    function getDefaultColumn(column: TableColumn) {
      return <ElTableColumn {...column}>
        {
          extend(
            { default: (scope: Recordable) => slots.default?.(scope) },
            headerSlot
          )
        }
      </ElTableColumn>;
    }

    /**
     * 给带有 editable 的 header 增加编辑 icon
     */
    function editHeaderSlot(column: TableColumn) {
      if (column.editable) {
        return {
          header: ({ column }: Recordable) => {
            return (
              <>
                <span>{column.label}</span>
                <Icon icon='solar:pen-2-outline' />
              </>
            );
          }
        };
      }
      return {};
    }

    /**
     * 编辑表格 column
     */
    function renderEditCellColumn(column: TableColumn) {
      return <ElTableColumn {...column}>
        {
          extend(
            {
              default: (scope: Recordable) => {
                if (column.editable) {
                  return (
                    <EditTableCell
                      column={column}
                      scope={scope}
                      isCancelEditRow={isCancelEditRow.value}
                      isOpenEdit={scope.$index === editRowIndex.value}
                      onEdit-column-change={(val: any) => onEditChange(val, scope, column)}
                      onCancel-edit-row-state-change={() => isCancelEditRow.value = false}
                    />
                  );
                } else {
                  slots.default?.(scope);
                }
              }
            },
            editHeaderSlot(column)
          )
        }
      </ElTableColumn>;
    }

    /**
     * 单元格 change event
     */
    function onEditChange(val: any, scope: Recordable, column: TableColumn) {
      const { row } = scope;
      row[column.prop as string] = val;
      emit('edit-column-change', scope);
    }

    /**
     * slot or render Column
     */
    function renderCustomColumn(column: TableColumn) {
      if (column.customRender != 'render') {
        return <ElTableColumn {...column}>
          {
            extend(
              { default: (scope: Recordable) => slots[column.customRender as string]?.(scope) },
              headerSlot
            )
          }
        </ElTableColumn>;
      } else {
        return <ElTableColumn {...column}>
          {
            extend(
              { default: (scope: Recordable) => column.render?.(scope) },
              headerSlot
            )
          }
        </ElTableColumn>;
      }
    }

    /**
     * 根据不同情况处理 tableColumn
     */
    function renderColumn(column: TableColumn) {
      if (!Object.keys(column).includes('formatter')) {
        column['formatter'] = (row: Recordable, _: TableColumn, cellValue: any) => {
          return cellValue ? cellValue : (column.placeholder || '-');
        };
      }

      switch(column.type) {
        case 'index':
        case 'selection':
          return getDefaultColumn(column);
        // 表格展开 expand 插槽
        case 'expand':
          return <ElTableColumn {...column}>
            {
              extend(
                { default: (scope: Recordable) => slots.expand?.(scope) },
                headerSlot
              )
            }
          </ElTableColumn>;
      }

      // render-header
      if (column.renderHeader && typeof column.renderHeader === 'function') {
        {
          extend(
            { default: (scope: Recordable) => slots.default?.(scope) },
            { header: (scope: Recordable) => column.renderHeader(scope) }
          );
        }
      }

      // render 或 slot
      if (column.customRender) {
        return renderCustomColumn(column);
      }

      // 编辑表格
      if (column.editable) {
        return renderEditCellColumn(column);
      }

      // 其他处理
      return getDefaultColumn(column);
    }


    expose({
      tableRef,
      setEditRowIndex,
      getEditRowIndex,
      cancelEdit,
    });
    return () => (
      <div class="basic-table">
        <ElTable
          ref={tableRef}
          class='basic-table'
          border
          stripe
          data={props.data}
          {...attrs}
        >
          {
            props.columns
              && props.columns.length
              && props.columns.map((column) => renderColumn(column))
          }
        </ElTable>

        {
          props.config
            && props.config.isPagination
            && <SopPagination
              {...props.config.pagination}
              onCurrent-change={(pageNum: number) => emit('current-change', pageNum)}
              onSize-change={(sizeNum: number) => emit('size-change', sizeNum)}
            />
        }
      </div>
    );
  }
});
