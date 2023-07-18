<template>
  <div class="demo">
    <SopCover
      v-for="item in coverTypes"
      :key="item"
      :type="item"
    />
  </div>

  <div class="demo">
    <SopCover
      src="https://element-plus.org/images/element-plus-logo.svg"
      :height="28"
      :width="113"
    />
  </div>

  <div class="demo">
    <SopCover
      src="https://element-plus.org/images/element-plus-logo.svg"
      is-cover-edit
      @cover-edit="uploadImage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
type CoverTypeEnum = 'album' | 'track' | 'cp' | 'customer' | 'contract' | 'dsp' | 'playlist-project' | 'playlist'
const coverTypes = ref<CoverTypeEnum[]>(['album', 'track', 'cp', 'customer', 'contract', 'dsp', 'playlist-project', 'playlist']);

const uploadImage = () => {
  ElMessage.success('请配合 ElUpload 组件实现上传方法');
};
</script>

<style lang="scss">
.demo {
  width: 100%;
  margin-top: 10px;
}
</style>
