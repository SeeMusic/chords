import { defineComponent, withModifiers, useSlots, getCurrentInstance } from 'vue';
import { RouterLink, Router } from 'vue-router';

export default defineComponent({
  name: 'SopPageHeader',
  components: {
    RouterLink
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    back: {
      type: [Object, Number],
      default: 0
    }
  },
  setup(props, { slots }) {
    const instance = getCurrentInstance();

    const $slots = useSlots();
    const $router = instance?.proxy?.$router as Router;

    function routeJumpWay() {
      if (typeof props.back === 'number') {
        return <a
          href="#"
          onClick={withModifiers(() => {
            $router.go(props.back as unknown as number);
          }, ['prevent'])}
        >
          <i class="sop-icon sop-icon--arrow-down" />返回
        </a>;
      } else {
        return <RouterLink to={props.back}>
          <i class="sop-icon sop-icon--arrow-down" />返回
        </RouterLink>;
      }
    }
    return () => (
      <div class="sop-page__hd">
        {
          props.back ?
            <div class="sop-page-path">
              {routeJumpWay()}
              <span class="slice">/</span>
              <span>{props.title}</span>
            </div> :
            <div class="sop-page-title">
              {props.title}
            </div>
        }
        {
          $slots.opt &&
          <div class="sop-page-opt">
            {slots.opt?.()}
          </div>
        }
      </div>
    );
  },
});
