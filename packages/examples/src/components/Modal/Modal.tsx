import { defineComponent } from 'vue';
import { ElDialog, ElButton } from 'element-plus';

export default defineComponent({
  name: 'SopModal',
  components: { ElDialog, ElButton },
  props: {
    visible: {
      type: Boolean,
      require: true
    },
    width: {
      type: String,
      default: '45%'
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
  emits: ['update:visible'],
  setup(props, { attrs, emit, slots }) {

    function beforeClose() {
      emit('update:visible', !props.visible);
    }

    function confirmModal() {
      //
    }

    function cancelModal() {
      //
    }

    return () => (
      <ElDialog
        {...attrs}
        width={props.width}
        modelValue={props.visible}
        before-close={beforeClose}
        destroy-on-close
      >
        {{
          header: () => slots.header?.(),
          footer: () => (
            (props.isShowCancelBtn || props.isShowConfirmBtn) &&
            <>
              {
                props.isShowCancelBtn &&
                <ElButton size="small" onClick={cancelModal}>{props.cancelBtnText}</ElButton>
              }
              {
                props.isShowConfirmBtn &&
                <ElButton size="small" type="primary" onClick={confirmModal}>{props.confirmBtnText}</ElButton>
              }
            </>
          )
        }}
      </ElDialog>
    );
  },
});
