import { defineStore } from "pinia";
import { ref } from "vue";

export const triggerStore = defineStore("triggerStore", () => {
  const sidebarToggle = ref(false);
  const sidebarCollapse = ref(false);

  const setSidebarToggle = (value) => {
    sidebarToggle.value = value;
  }

  const setSidebarCollapse = (value) => {
    sidebarCollapse.value = value;
  }

  return {
    sidebarToggle,
    sidebarCollapse,

    setSidebarToggle,
    setSidebarCollapse
  }
})