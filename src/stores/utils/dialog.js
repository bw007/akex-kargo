import { defineStore } from "pinia";
import { ref } from "vue";

export const dialogStore = defineStore("dialogStore", () => {
  const toggle = ref(false)
  const editToggle = ref(false)

  const setToggle = (value) => {
    toggle.value = value
  }
  const setEditToggle = (value) => {
    editToggle.value = value
  }

  return {
    toggle,
    editToggle,
    
    setToggle,
    setEditToggle
  }
})