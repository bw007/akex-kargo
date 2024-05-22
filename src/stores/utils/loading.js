import { defineStore } from "pinia";
import { ref } from "vue";

export const loadingStore = defineStore("loadingStore", () => {
  const loading = ref(false);

  const setLoading = (value) => {
    loading.value = value
  }

  return {
    loading,

    setLoading
  }
})