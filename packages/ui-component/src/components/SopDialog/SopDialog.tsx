import { defineComponent, ref, computed, Slots } from 'vue';
import { ElDialog, ElButton } from 'element-plus';

export interface OnOKEvent {
  close: () => void
  setLoading: (status: boolean) => void
}
export interface DialogOrDrawerHeaderSlots {
  close: () => void
  titleId: string
  titleClass: string
}

export default defineComponent({
  name: 'SopDialog',
  components: { ElDialog, ElButton },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    width: {
      type: String,
      default: '45%'
    },
    isShowFooter: {
      type: Boolean,
      default: true,
    },
    isShowDefaultFooter: {
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
    const isShowDefaultFooter = computed(() => (props.isShowCancelBtn || props.isShowConfirmBtn) && props.isShowDefaultFooter);

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

    function renderFooter(slots: Slots) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const slot: Record<string, any> = {
        header: (val: DialogOrDrawerHeaderSlots) => slots.header?.(val),
        default: () => slots.default?.()
      };
      if (props.isShowFooter) {
        slot['footer'] = () => (
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
        );
      }
      return slot;
    }

    return () => (
      <ElDialog
        {...attrs}
        modelValue={props.visible}
        before-close={beforeClose}
        destroy-on-close
        width={props.width}
      >
        {renderFooter(slots)}
      </ElDialog>
    );
  },
});
