import { defineComponent, withModifiers, useSlots, getCurrentInstance } from 'vue';
import { useLocale } from '../../composables/useLocale';
import type { RouteLocationRaw, Router } from 'vue-router';

export default defineComponent({
  name: 'SopPageHeader',
  props: {
    title: {
      type: String,
      default: ''
    },
    back: {
      type: [Object, Number, String, Function],
    }
  },
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const { t } = useLocale();

    const $slots = useSlots();
    const $router = instance?.proxy?.$router as Router;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const validatorDataType = (val: any) => Object.prototype.toString.call(val).slice(8, -1);

    function backHtml() {
      return <>
        <i class="sop-icon sop-icon--arrow-down" />
        { t('sop.common.back') }
      </>;
    }

    function routeJumpWay() {
      switch(validatorDataType(props.back)) {
        case 'Number':
          return <a
              href="#"
              onClick={withModifiers(() => {
                $router.go(props.back as number);
              }, ['prevent'])}
            >
              {backHtml()}
            </a>;
        case 'String':
          return <a
              href="#"
              onClick={withModifiers(() => {
                $router.push({ path: props.back as string });
              }, ['prevent'])}
            >
              {backHtml()}
            </a>;
        case 'Object':
          return <a
              href="#"
              onClick={withModifiers(() => {
                $router.push(props.back as RouteLocationRaw);
              }, ['prevent'])}
            >
              {backHtml()}
            </a>;
        case 'Function':
          return <a
            href="#"
            onClick={withModifiers(() => {
              (props.back as () => void)();
            }, ['prevent'])}
          >
            {backHtml()}
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
