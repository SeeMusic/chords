<template>
  <div>
    <SopCard>
      <ElButton @click="dialogVisible_1 = true">无 footer dialog</ElButton>
      <SopDialog
        v-model:visible="dialogVisible_1"
        :is-show-footer="false"
        title="Dialog"
      ></SopDialog>

      <ElButton @click="dialogVisible_2 = true">有 footer dialog</ElButton>
      <SopDialog
        v-model:visible="dialogVisible_2"
        is-show-default-footer
        title="Dialog"
      ></SopDialog>
    </SopCard>

    <SopCard>
      <ElButton @click="drawerVisible_1 = true">无 footer drawer</ElButton>
      <SopDrawer
        v-model:visible="drawerVisible_1"
        :is-show-footer="false"
        title="Drawer"
      ></SopDrawer>
      <ElButton @click="drawerVisible_2 = true">有 footer drawer</ElButton>
      <SopDrawer
        v-model:visible="drawerVisible_2"
        is-show-default-footer
        title="Drawer"
      ></SopDrawer>
    </SopCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dialogVisible_1 = ref(false);
const dialogVisible_2 = ref(false);
const drawerVisible_1 = ref(false);
const drawerVisible_2 = ref(false);
</script>

<style lang="scss">
.sop-card {
  margin-bottom: 10px;
}
</style>
