<template>
  <div>
    <ElButton @click="visible = true">按钮</ElButton>

    <SopDrawer
      v-model:visible="visible"
      title="标题"
      @on-close="onDrawerClose"
      @on-ok="onDrawerOK"
    >
      弹窗内容
    </SopDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SopDrawer } from '@/components/Drawer';
import { ElMessage } from 'element-plus';

const visible = ref(false);

const onDrawerClose = () => {
  ElMessage.success('modal closed');
};

const onDrawerOK = (e: Record<string, (status?: boolean) => void>) => {
  ElMessage.success('modal submit');
  e.setLoading(true);
  setTimeout(() => {
    e.setLoading(false);
    e.close();
  }, 2000);
};
</script>
