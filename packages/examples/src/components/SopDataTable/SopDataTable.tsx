import { defineComponent, ref, onMounted, computed, watchEffect, nextTick } from 'vue';

export default defineComponent({
  name: 'SopDataTable',
  props: {
    title: {
      type: String,
      default: ''
    },
    cols: {
      type: Number,
      default: 2
    },
    gap: {
      type: Number,
      default: 16
    }
  },
  setup(props, { slots }) {

    // flex 尾行左对齐 dirty 写法
    // 1. 获取实际 slot 中 item 内容项个数
    const content = ref<HTMLElement | null>(null);
    const itemCount = ref(0);

    // 2. 计算出尾行 是否需要填充占位 div、需要的话需要填充多少个
    const needFillPlaceholder = computed(() => itemCount.value % props.cols !== 0);
    const placeholderCount = computed(() => needFillPlaceholder.value
      ? props.cols - (itemCount.value % props.cols)
      : 0
    );
    // 3. 计算出每一项的宽度并在 style 中引用
    const itemWidth = computed(() => `calc((100% - ${props.gap * (props.cols - 1)}px) / ${props.cols})`);

    watchEffect(() => {
      nextTick(() => {
        if (content.value) {
          const items = content.value.querySelectorAll('.sop-data-table-item');
          if (items.length) {
            for (let i = 0; i <= items.length; i++) {
              if ((items[i] as HTMLDivElement)) {
                (items[i] as HTMLDivElement).style.width = itemWidth.value;
              }
            }
          }
        }
      });
    });

    onMounted(() => {
      if (content.value !== null) {
        itemCount.value = content.value.querySelectorAll('.sop-data-table-item').length;
      }
    });
    return () => (
      <div class="sop-data-table">
        {
          props.title &&
          <div class="sop-data-table__title">
            { props.title }
          </div>
        }

        <div
          ref={content}
          class="sop-data-table__content"
        >
          {slots.default?.()}
          {
            needFillPlaceholder.value &&
            new Array(placeholderCount.value).fill(0).map((i: number) => (
              <div key={i} class="sop-data-table-item sop-data-table-item--no-border"></div>
            ))
          }
        </div>
      </div>
    );
  },
});
