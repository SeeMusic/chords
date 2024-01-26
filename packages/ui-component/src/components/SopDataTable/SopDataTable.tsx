import { defineComponent, ref, onMounted, computed, nextTick, onBeforeUpdate } from 'vue';

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
    // 获取实际 slot 中 item 内容项个数
    const content = ref<HTMLElement | null>(null);
    // 计算出每一项的宽度并在 style 中引用
    const itemWidth = computed(() => `calc((100% - ${props.gap * (props.cols - 1)}px) / ${props.cols})`);

    onMounted(() => {
      setSopDateTableItemWidth();
    });

    onBeforeUpdate(() => {
      setSopDateTableItemWidth();
    });

    async function setSopDateTableItemWidth() {
      await nextTick();
      const items = content.value?.querySelectorAll('.sop-data-table-item') || [];
      if (items.length) {
        for (let i = 0; i <= items.length; i++) {
          if ((items[i] as HTMLDivElement)) {
            (items[i] as HTMLDivElement).style.width = itemWidth.value;
          }
        }
      }
    }

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
          style={{ gap: `0 ${props.gap + 'px'}` }}
        >
          {slots.default?.()}
        </div>
      </div>
    );
  },
});
