import { defineStore } from "pinia";
import { ref } from "vue";

export const tokenStore = defineStore("tokenStore", () => {
  const token = ref('');

  const setToken = (value) => {
    token.value = value
  }

  return {
    token,

    setToken
  }
})