<template>
  <ElInput
    ref="inputRef"
    class="sop-input"
    :modelValue="modelValue"
    @update:modelValue="(val) => $emit('update:modelValue', val)"
    v-bind="$attrs"
  >
    <template
      v-for="(slot, slotName) in $slots"
      #[slotName]="slotProps"
    >
      <slot
        :name="slotName"
        v-bind="slotProps"
      />
    </template>
  </ElInput>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import { ElInput, type InputInstance } from 'element-plus';
type ExposeInput = Pick<
  InputInstance,
  'blur' | 'clear' | 'focus' |
  'input' | 'resizeTextarea' | '_ref' |
  'select' | 'textarea' | 'textareaStyle'
>;

export default defineComponent({
  name: 'SopInput',
  components: { ElInput },
  props: {
    modelValue: { default: '' },
    scrollPlaceholder: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, expose }) {
    // const attrs = useAttrs();
    const placeholderText = ref(attrs.placeholder as string || '');
    const inputRef = ref<InputInstance | null>(null);

    const inputWrapper = ref<HTMLDivElement | null>();
    // const inputSuffix = ref<HTMLDivElement | null>();
    const inputPrefix = ref<HTMLDivElement | null>();
    const input = ref<HTMLInputElement | null>();
    const placeholder = ref<HTMLDivElement | null>();

    // 用户更改 placeholder 时，更新 placeholder
    watch(() => attrs.placeholder, (val) => {
      placeholderText.value = val as string;
    }, { immediate: true });

    watch(() => props.modelValue, () => {
      setPlaceholderVisibility(props.modelValue !== '');
    }, { immediate: true });

    onMounted(() => {
      if (inputRef.value === null) return;
      input.value = inputRef.value.$refs.input as HTMLInputElement;
      // 如果不需要滚动字幕, 将原生的显示出来
      if (!props.scrollPlaceholder) {
        input.value.classList.remove('el-input__inner--scroll');
        return;
      }
      input.value.classList.add('el-input__inner--scroll');

      inputWrapper.value =
        inputRef.value.$el.querySelector('.el-input__wrapper') as HTMLDivElement;
      // inputSuffix.value =
      //   inputWrapper.value?.querySelector('.el-input__suffix') as HTMLDivElement;
      inputPrefix.value =
        inputWrapper.value?.querySelector('.el-input__prefix') as HTMLDivElement;

      createPlaceholderElement();
      setPlaceholderPosition();
    });

    function createPlaceholderElement() {
      const div = document.createElement('div');
      const span = document.createElement('span');
      div.classList.add('el-input__placeholder');
      div.appendChild(span);
      span.textContent = placeholderText.value;
      inputWrapper.value?.appendChild(div);
    }

    function setPlaceholderPosition() {
      // const suffixWidth = inputSuffix.value?.offsetWidth || 0;
      const prefixWidth = inputPrefix.value?.offsetWidth || 0;
      const inputWidth = input.value?.offsetWidth || 0;
      placeholder.value =
        inputWrapper.value?.querySelector('.el-input__placeholder') as HTMLDivElement;
      const placeholderWidth = placeholder.value?.offsetWidth || 0;

      if (prefixWidth) {
        placeholder.value.style.left = `${prefixWidth + 8}px`;
      }

      // 字幕滚动
      if (placeholderWidth > inputWidth) {
        placeholder.value.classList.add('is-scroll');
        placeholder.value.style.maxWidth = `${inputWidth}px`;
      } else {
        placeholder.value.classList.remove('is-scroll');
      }
    }

    function setPlaceholderVisibility(val: boolean) {
      if (placeholder.value) {
        val
          ? placeholder.value.style.opacity = '0'
          : placeholder.value.style.opacity = '1';
      }
    }

    const _expose: ExposeInput = new Proxy(
      {} as ExposeInput,
      {
        get(_, key, receiver) {
          if (inputRef.value === null) return;
          if (key === 'ref') {
            return Reflect.get(inputRef.value, '_ref', receiver);
          }
          return Reflect.get(inputRef.value, key, receiver);
        },
        has(_, key) {
          if (inputRef.value === null) return false;
          return Reflect.has(inputRef.value, key);
        }
      }
    );
    expose(_expose) as unknown as (exposed?: ExposeInput) => void;

    return {
      inputRef
    };
  }
}) as unknown as typeof ElInput;
</script>
