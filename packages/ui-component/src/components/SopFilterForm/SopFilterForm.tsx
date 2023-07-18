import { defineComponent, ref, withModifiers, onMounted, onBeforeMount } from 'vue';
import { ElForm } from 'element-plus';

export default defineComponent({
  name: 'SopFilterForm',
  components: {
    ElForm
  },
  setup(props, { slots, attrs }) {
    const isFilterShow = ref(true);
    const formRef = ref<InstanceType<typeof ElForm> | null>(null);

    // 防止提交表单后刷新页面
    const prevent = (e: Event) => e.preventDefault();

    onMounted(() => {
      if (formRef.value) {
        formRef.value.$el.addEventListener('submit', prevent);
      }
    });

    onBeforeMount(() => {
      if (formRef.value) {
        formRef.value.$el.removeEventListener('submit', prevent);
      }
    });
    return () => (
      <ElForm
        ref={formRef}
        {...attrs}
        class={['sop-filter sop-filter--toggleable', isFilterShow.value ? 'sop-filter--opened' : '']}
        label-position="top"
      >
        <div class="sop-filter__toggle">
          <strong>查询或筛选</strong>
          <a
            href="#"
            onClick={withModifiers(() => {
              isFilterShow.value = !isFilterShow.value;
            }, ['prevent'])}
          >{ isFilterShow.value ? '收起' : '展开' }</a>
        </div>

        {
          isFilterShow.value &&
          <>
            <div class="sop-filter__content">
              {slots.default?.()}
            </div>

            <div class="sop-filter__operation">
              {slots.opt?.()}
            </div>
          </>
        }
      </ElForm>
    );
  }
});
