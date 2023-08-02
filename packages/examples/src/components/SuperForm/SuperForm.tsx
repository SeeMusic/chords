/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent } from 'vue';
import {
  ElForm,
  ElInput,
  ElSelect,
  ElOption,
  ElRadioGroup,
  ElRadio,
  ElCheckboxGroup,
  ElCheckbox,
  ElSwitch,
  ElDatePicker,
  ElTimePicker,
  ElTimeSelect,
  ElFormItem
} from 'element-plus';
import type { PropType } from 'vue';
import type { FormRules, FormItemRule  } from 'element-plus';

type Arrayable<T> = T | T[]

export type ComponentType = 'ElInput' | 'ElSelect' | 'ElRadio' | 'ElCheckbox' | 'ElSwitch' | 'ElDatePicker' | 'ElTimePicker' | 'ElTimeSelect'

export interface FormSchema {
  model: Record<string, any>,
  rules?: FormRules
  inline?: boolean
  labelPosition?: 'left' | 'right' | 'top',
  labelWidth?: number | string
  labelSuffix?: string
  hideRequiredAsterisk?: boolean
  requireAsteriskPosition?: 'left' | 'right',
  showMessage?: boolean
  inlineMessage?: boolean
  statusIcon?: boolean
  validateOnRuleChange?: boolean
  size?: '' | 'large' | 'default' | 'small',
  disabled?: boolean
  scrollToError?: boolean
  scrollIntoViewOptions?: Record<string, any> | boolean
  formItems: FormSchemaItem[]
}

export interface FormSchemaItem {
  prop: string
  label: string
  labelWidth?: number | string
  required?: boolean
  rules?: Arrayable<FormItemRule>
  error?: string
  showMessage?: string
  inlineMessage?: string
  size?: '' | 'large' | 'default' | 'small'
  for?: string
  validateStatus?: '' | 'error' | 'validating' | 'success'
  component: ComponentType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentProps: Record<string, any>
}


export default defineComponent({
  name: 'SopSuperForm',
  components: {
    ElForm,
    ElInput, ElSwitch, ElDatePicker, ElTimePicker, ElTimeSelect,
    ElRadioGroup, ElRadio,
    ElCheckboxGroup, ElCheckbox,
    ElSelect, ElOption
  },
  props: {
    form: {
      type: Object as PropType<FormSchema>,
      required: true
    }
  },
  setup(props) {
    const defaultFormSchema: FormSchema = {
      model: {},
      inline: false,
      labelPosition: 'left',
      labelWidth: '100px',
      showMessage: true,
      size: 'small',
      formItems: []
    };
    const mergeFormSchema = (val: FormSchema, newVal: FormSchema): FormSchema => Object.assign(val, newVal);
    const formSchema = ref<FormSchema>(mergeFormSchema(defaultFormSchema, props.form));

    /**
     * @description 获取对应 formItem 的 prop
     */
    function getFormSchemaItemPropName() {
      //
    }

    function renderFormElement(component: ComponentType, componentProps: Record<string, any>) {
      console.log(componentProps);
      switch(component) {
        case 'ElRadio':
          return <ElRadioGroup>
            <ElRadio></ElRadio>
          </ElRadioGroup>;
        case 'ElCheckbox':
          return <ElCheckboxGroup>
            <ElCheckbox></ElCheckbox>
          </ElCheckboxGroup>;
        case 'ElSelect':
          return <ElSelect>
            <ElOption value />
          </ElSelect>;
        case 'ElInput':
          return <ElInput />;
        case 'ElDatePicker':
          return <ElDatePicker />;
        case 'ElTimePicker':
          return <ElTimePicker />;
        case 'ElTimeSelect':
          return <ElTimeSelect />;
        case 'ElSwitch':
          return <ElSwitch
            modelValue={formSchema.value.model['delivery']}
            onUpdate:modelValue={(val: string | number | boolean) => formSchema.value.model['delivery'] = val}
          />;
      }
    }

    return () => (
      <ElForm
        model={formSchema.value.model}
      >
        {
          formSchema.value.formItems.map(item => {
            return <ElFormItem prop={item.prop}>
              {renderFormElement(item.component, item.componentProps)}
            </ElFormItem>;
          })
        }
      </ElForm>
    );
  },
});
