import { defineComponent, renderSlot, provide, computed } from 'vue';
import { localeContextKey } from '../../composables/useLocale';
import type { PropType } from 'vue';
import type { Language } from '../../locales';


export default defineComponent({
  props: {
    locale: {
      type: Object as PropType<Language>,
      default: () => ({})
    }
  },
  name: 'SopConfigProvider',
  setup(props, { slots }) {
    const locale = computed(() => props.locale);

    provide(localeContextKey, locale.value);

    return () => renderSlot(slots, 'default', { locale: locale.value });
  }
});
