import { defineComponent, ref, computed, Slots } from 'vue';
import { ElDialog, ElButton } from 'element-plus';
import { useLocale } from '../../composables/useLocale';

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
      type: String
    },
    cancelBtnText: {
      type: String
    }
  },
  emits: ['update:visible', 'on-ok', 'on-close'],
  setup(props, { attrs, emit, slots }) {
    const { t } = useLocale();

    const confirmBtnText = ref(props.confirmBtnText || t('sop.common.confirm'));
    const cancelBtnText = ref(props.cancelBtnText || t('sop.common.cancel'));
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
                <ElButton onClick={beforeClose}>{cancelBtnText.value}</ElButton>
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
                  {confirmBtnText.value}
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
