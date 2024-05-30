import { defineStore } from "pinia";
import { ref } from "vue";

export const dialogStore = defineStore("dialogStore", () => {
  const toggle = ref(false)
  const editToggle = ref(false)
  const paymentToggle = ref(false)
  
  const setToggle = (value) => {
    toggle.value = value
  }
  
  const setEditToggle = (value) => {
    editToggle.value = value
  }

  const setPaymentToggle = (value) => {
    paymentToggle.value = value
  }

  return {
    toggle,
    editToggle,
    paymentToggle,
    
    setToggle,
    setEditToggle,
    setPaymentToggle
  }
})