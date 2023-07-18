import { defineComponent, computed, useSlots } from 'vue';

export default defineComponent({
  name: 'SopDataTableItem',
  props: {
    label: {
      type: String,
      default: ''
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { slots }) {

    // 根据 slot 有没传值判断操作区是否显示
    const isOperationShow = computed(() => !!useSlots().opt);

    return () => (
      <div class={[
        'sop-data-table-item',
        !props.border ? 'sop-data-table-item--no-border' : ''
      ]}>
        {
          props.label !== '' &&
          <div class="sop-data-table-item__label">
            { props.label }
            {
              isOperationShow.value &&
              <div class="sop-data-table-item__opt">
                {slots.opt?.()}
              </div>
            }
          </div>
        }
        <div class="sop-data-table-item__content">
          {slots.default?.()}
        </div>
      </div>
    );
  },
});
