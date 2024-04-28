import { defineStore } from "pinia";
import { ref } from "vue";

export const dialogStore = defineStore("dialogStore", () => {
  const toggle = ref(false)

  const setToggle = (value) => {
    toggle.value = value
  }

  return {
    toggle,
    
    setToggle
  }
})