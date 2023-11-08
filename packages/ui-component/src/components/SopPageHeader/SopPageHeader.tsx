import { defineComponent, withModifiers, useSlots, getCurrentInstance } from 'vue';
import { useLocale } from '../../composables/useLocale';
import type { RouteLocationRaw, Router } from 'vue-router';

type StringArray = string | string[];

export default defineComponent({
  name: 'SopPageHeader',
  props: {
    title: {
      type: [String,  Array],
      default: ''
    },
    back: {
      type: [Object, Number, String, Function],
      default: 0
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

    function genTitle (title: string | string[]) {
      if (Array.isArray(title)) {
        return title.map((text: string, i: number) => (
          <span key={i} class="sop-page-title-item">
            <span class="text">{text}</span>
            {i < title.length -1 ? <span class="separate">/</span> : ''}
          </span>
        ));
      } else {
        return title;
      }
    }

    return () => (
      <div class="sop-page__hd">
        {
          props.back ?
            <div class="sop-page-path">
              {routeJumpWay()}
              <span class="slice">/</span>
              <div class="sop-page-title">
                {genTitle(props.title as StringArray)}
              </div>
            </div> :
            <div class="sop-page-title">
              {genTitle(props.title as StringArray)}
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
