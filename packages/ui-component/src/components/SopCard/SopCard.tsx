import { defineComponent, useSlots } from 'vue';

export default defineComponent({
  name: 'SopCard',
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
      <div class="sop-card">
        <div class="sop-card__hd">
          <span class="sop-card__hd-title">
            {props.title}
            {slots.titleExtra?.()}
          </span>
          {
            $slots.opt &&
              <span class="sop-card__hd-opt">
                {slots.opt?.()}
              </span>
          }
        </div>

        <div class="sop-card__bd">
          {slots.default?.()}
        </div>

        {
          $slots.footer &&
          <div class="sop-card__ft">
            {slots.footer?.()}
          </div>
        }
      </div>
    );
  },
});
