<template>
  <SopCard title="Super Form Component">
    <SuperForm :form="formSchema" />
  </SopCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SuperForm } from '../components/SuperForm';
import { FormSchema } from '../components/SuperForm/SuperForm';

const form = ref({
  name: 'Hello',
  region: '',
  count: '',
  date1: '',
  date2: '',
  delivery: '',
  type: [],
  resource: '',
  desc: '',
});

const formSchema = ref<FormSchema>({
  model: form.value,
  formItems: [
    {
      prop: 'name',
      label: '活动名称',
      component: 'ElInput',
      componentProps: {}
    },
    {
      prop: 'region',
      label: '活动类型',
      component: 'ElSelect',
      componentProps: {}
    },
    {
      prop: 'date1',
      label: '活动时间',
      component: 'ElDatePicker',
      componentProps: {}
    },
    {
      prop: 'date2',
      label: '活动具体时间',
      component: 'ElTimePicker',
      componentProps: {}
    },
    {
      prop: 'delivery',
      label: '活动开关',
      component: 'ElSwitch',
      componentProps: {}
    },
    {
      prop: 'type',
      label: '活动类型（多选）',
      component: 'ElCheckbox',
      componentProps: {}
    },
    {
      prop: 'resource',
      label: '活动类型（单选）',
      component: 'ElRadio',
      componentProps: {}
    }
  ]
});
</script>
