import { defineComponent, useSlots } from 'vue';

export default defineComponent({
  name: 'SopBasicInfo',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup(props, ctx) {
    const { slots } = ctx;
    const $slots = useSlots();

    return () => (
      <div
        class="sop-basic-info"
        style={{
          padding: $slots.cover ? '0 0 0 88px' : '0'
        }}
      >
        {
          $slots.cover &&
            <div class="sop-basic-info__cover">
              {slots.cover?.()}
            </div>
        }
        <p class="sop-basic-info__title">
          {props.title}
        </p>

        <div class="sop-meta-info">
          {slots.default?.()}
        </div>

        {
          $slots.opt &&
            <div class="sop-basic-info__opt">
              {slots.opt?.()}
            </div>
        }
      </div>
    );
  },
});
