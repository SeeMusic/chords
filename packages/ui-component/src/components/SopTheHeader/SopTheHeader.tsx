import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'SopTheHeader',
  props: {
    logo: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    }
  },
  emits: ['logo-click'],
  setup(props, { slots, emit }) {
    const isImg = computed(() => /\.(png|jpg|gif|jpeg|webp)$/.test(props.subTitle));

    return () => (
      <div class="sop-the-header">
        <div class="the-header-left__content">
          <div
            class="the-logo"
            onClick={() => {
              emit('logo-click');
            }}
          >
            <img src={props.logo} height="20" />
          </div>
          {
            props.subTitle &&
            <div class="the-sub-title">
              {isImg.value ? <img src={props.subTitle}/> :  <h3>{props.subTitle}</h3>}
            </div>
          }
        </div>

        <div class="the-header-right__content">
          {slots.rightOpt?.()}
        </div>
      </div>
    );
  }
});
