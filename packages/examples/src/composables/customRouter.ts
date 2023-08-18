import { getCurrentInstance, computed } from 'vue';

export function useCustomRouter() {
  const instance = getCurrentInstance();

  const route = computed(() => instance?.proxy?.$route);
  const router = computed(() => instance?.proxy?.$router);

  return {
    route,
    router
  };
}