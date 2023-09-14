import { defineComponent, toRefs } from 'vue';
import { ElPagination } from 'element-plus';

export default defineComponent({
  name: 'SopPagination',
  components: { ElPagination },
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 20
    },
    total: {
      type: Number,
      default: 0
    },
  },
  emits: ['current-change', 'size-change', 'update:current-page', 'update:page-size'],
  setup(props, { attrs, emit, slots }) {
    const { currentPage, pageSize, total } = toRefs(props);

    function renderSlots () {
      if (typeof slots.default === 'function') {
        return {
          default: () => slots.default?.()
        };
      }
      return {
        default: () => <span class="el-pagination__text"> 共 {total.value} 条，仅显示前 500 页结果</span>
      };
    }

    return () => (
      <ElPagination
        currentPage={currentPage.value}
        pageSize={pageSize.value}
        onUpdate:current-page={(page: number) => emit('update:current-page', page)}
        onUpdate:page-size={(size: number) => emit('update:page-size', size)}

        layout="slot, prev, pager, next, jumper, sizes"
        total={props.total}
        onSize-change={(sizeNum: number) => emit('size-change', sizeNum)}
        onCurrent-change={(pageNum: number) => emit('current-change', pageNum)}
        {...attrs}
      >
        {/* 如果传入默认插槽后, 本身默认的内容就会被覆盖 */}
        {renderSlots()}
      </ElPagination>
    );
  },
});
