<template>
  <div style="margin: 10px;">
    <ElInput
      v-model="input"
      placeholder="Failed to reload /src/components/SopInput/SopInput.vue. This could be due to syntax errors or importing non-existent modules. (see errors above)....."
    >
      <!-- <template #prepend>
        <div>prepend</div>
      </template> -->

      <template #append>
        <div>append</div>
      </template>

      <!-- <template #prefix>
        <div>prefix</div>
      </template> -->

      <template #suffix>
        <div>suffix</div>
      </template>
    </ElInput>


    <SopInput
      v-model="input"
      ref="inputRef"
      aa="aa"
      @change="onChange"
      :s=1
      placeholder="Failed to reload /src/components/SopInput/SopInput.vue. This could be due to syntax errors or importing non-existent modules. (see errors above)...."
      @input="onInput"
      @blur="onBlur"
    >
      <!-- <template #prepend>
        <div>prepend</div>
      </template> -->

      <template #append>
        <div>append</div>
      </template>

      <!-- <template #prefix>
        <div>prefix</div>
      </template> -->

      <template #suffix>
        <div>suffix</div>
      </template>
    </SopInput>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElInput } from 'element-plus';
import type { SopInput } from '@seemusic/ui-components/components';
// import SopInput from '../components/SopInput/SopInput.vue';

const input = ref('');
const inputRef = ref<InstanceType<typeof SopInput> | null>(null);

onMounted(() => {
  inputRef.value?.focus();
  console.log(inputRef?.value, 'inputRef... wrapper');

  setTimeout(() => {
    inputRef.value?.blur();
  }, 1000);
});

function onInput(val: string) {
  console.log(val, 'onInput...');
}

function onBlur(val: FocusEvent) {
  console.log(val, 'onBlur...');
}

function onChange(val: string) {
  console.log(val, 'onChange...');
}
</script>
