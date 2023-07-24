import { defineComponent, ref, computed } from 'vue';
import { ElDrawer, ElButton } from 'element-plus';

export interface OnOKEvent {
  close: () => void
  setLoading: (status: boolean) => void
}

export default defineComponent({
  name: 'SopDrawer',
  components: { ElDrawer, ElButton },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    size: {
      type: Number || String,
      default: 448
    },
    isDefaultFooter: {
      type: Boolean,
      default: false,
    },
    isShowConfirmBtn: {
      type: Boolean,
      default: true
    },
    isShowCancelBtn: {
      type: Boolean,
      default: true
    },
    confirmBtnText: {
      type: String,
      default: '确认'
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    }
  },
  emits: ['update:visible', 'on-ok', 'on-close'],
  setup(props, { attrs, emit, slots }) {
    const loading = ref(false);
    const isShowDefaultFooter = computed(() => (props.isShowCancelBtn || props.isShowConfirmBtn) && props.isDefaultFooter);

    function beforeClose() {
      emit('on-close');
      emit('update:visible', !props.visible);
    }

    function setLoading(status: boolean) {
      loading.value = status;
    }

    const okEvents: OnOKEvent = {
      close: beforeClose,
      setLoading
    };

    return () => (
      <ElDrawer
        {...attrs}
        modelValue={props.visible}
        before-close={beforeClose}
        size={props.size}
        destroy-on-close
      >
        {{
          header: () => slots.header?.(),
          default: () => slots.default?.(),
          footer: () => (
            isShowDefaultFooter.value ?
              <>
                {
                  props.isShowCancelBtn &&
                <ElButton onClick={beforeClose}>{props.cancelBtnText}</ElButton>
                }
                {
                  props.isShowConfirmBtn &&
                <ElButton
                  loading={loading.value}
                  type="primary"
                  onClick={() => {
                    emit('on-ok', okEvents);
                  }}
                >
                  {props.confirmBtnText}
                </ElButton>
                }
              </> :
              slots.footer?.()
          )
        }}
      </ElDrawer>
    );
  },
});
