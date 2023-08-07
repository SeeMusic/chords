import { defineComponent, ref } from 'vue';
import { ElTable, ElTableColumn } from 'element-plus';
import { Icon } from '@iconify/vue';
import EditTableCell from './EditTableCell.vue';
import { SopPagination } from '../SopPagination';
import { extend } from '../../utils';
import type { PropType, VNode } from 'vue';
import type { Column } from 'element-plus';
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
  label?: string
  type?: 'index' | 'selection' | 'expand'
  width?: string | number
  // 表格编辑开关
  editable?: boolean
  // 编辑行
  editRow?: boolean
  // 编辑列
  editColumn?: boolean
  editScheduler?: () => Promise<boolean>
  // 是否必填
  editRule?: boolean
  editComponent?: ComponentsType
  editComponentProps?: Recordable
}

export interface TableConfig {
  // 是否开启分页
  isPagination?: boolean
  pagination: {
    currentPage?: number
    pageSize?: number
    total?: number
  }
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
  emits: ['edit-change', 'current-change'],
  setup(props, { attrs, slots, emit, expose }) {
    const RENDER_WHITE_LIST = ['index', 'selection'];
    const headerSlot = slots.header ? { header: (scope: Recordable) => slots.header?.(scope) } : {};
    const tableRef = ref<InstanceType<typeof ElTable> | undefined>(undefined);

    expose({
      tableRef
    });

    /**
     * 给 带有 editable 的 header 增加编辑 icon
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
     * 根据不同情况处理 tableColumn
     */
    function renderColumn(column: TableColumn) {
      // 白名单内的不处理
      if (RENDER_WHITE_LIST.includes(column.type as string)) {
        return <ElTableColumn {...column}>
          {
            extend(
              { default: (scope: Recordable) => slots.default?.(scope) },
              headerSlot
            )
          }
        </ElTableColumn>;
      }

      // 表格展开 expand 插槽
      if (column.type === 'expand') {
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
     * slot 或者 render Column
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
     * 编辑表格
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
                      onEdit-change={(val) => onEditChange(val, scope, column)}
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
     * 单元格 change
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function onEditChange(val: any, scope: Recordable, column: TableColumn) {
      const { row } = scope;
      row[column.prop as string] = val;
      emit('edit-change', scope);
    }

    return () => (
      <>
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
            />
        }
      </>
    );
  }
});
