import { defineStore } from "pinia";
import { ref } from "vue";
import { apiStore } from "../utils/api";

export const authStore = defineStore("authStore", () => {
  const api = apiStore()
  const token = ref('');

  const setToken = (value) => {
    token.value = value;
  }

  const user = ref({})
  
  const login = async (data) => {
    let res = await api.post({ url: "signin", data });

    if (res.status == 200) {
      console.log(res.data);
    }
  }

  return {
    token,
    user,

    setToken,
    login
  }
})