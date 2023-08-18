<template>
  <div>
    {{ $route.name }}
    <br>
    <ElButton type="primary" @click="$router.back()">go back</ElButton>
  </div>
</template>

<script setup lang="ts"></script>
