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
      type: [Object, Number, String, Function],
      default: 0
    }
  },
  setup(props, { slots }) {
    const instance = getCurrentInstance();

    const $slots = useSlots();
    const $router = instance?.proxy?.$router as Router;
    const validatorDataType = (val: any) => Object.prototype.toString.call(val).slice(8, -1);

    function routeJumpWay() {
      switch(validatorDataType(props.back)) {
        case 'Number':
          return <a
              href="#"
              onClick={withModifiers(() => {
                $router.go(props.back as number);
              }, ['prevent'])}
            >
              <i class="sop-icon sop-icon--arrow-down" />返回
            </a>;
        case 'String':
          return <RouterLink to={{ path: props.back as string }}>
            <i class="sop-icon sop-icon--arrow-down" />返回
          </RouterLink>;
        case 'Object':
          return <RouterLink to={props.back as Record<string, string>}>
            <i class="sop-icon sop-icon--arrow-down" />返回
          </RouterLink>;
        case 'Function':
          return <a
            href="#"
            onClick={(e) => {
              (props.back as () => void)();
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <i class="sop-icon sop-icon--arrow-down" />返回
          </a>;
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
