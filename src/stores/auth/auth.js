import { defineStore } from "pinia";
import { ref } from "vue";
import { apiStore } from "../utils/api";
import { ElMessage } from "element-plus";
import router from "@/router";
import cookies from "vue-cookies"
import { loadingStore } from "../utils/loading";

export const authStore = defineStore("authStore", () => {
  const api = apiStore()
  const loading_store = loadingStore()

  const user = ref({})
  
  // Login
  const signIn = async (data) => {
    let res = await api.post({ url: "signin", data });

    if (res.status == 200) {
      ElMessage({
        type: "success",
        message: "Muvaffaqiyatli tizimga kirildi"
      })
      setTimeout(() => {
        loading_store.setLoading(false)
      }, 1000);
      cookies.set("token", res.data.accessToken)
      setTimeout(() => {
        router.push("/")
      }, 1500);
    }
  }

  // Registration
  const signUp = async (data) => {
    let res = await api.post({ url: "signup", data })
    
    if (res.status == 201) {
      ElMessage({
        type: "success",
        message: "Muvaffaqiyatli ro'yxatdan o'tildi"
      })
      setTimeout(() => {
        loading_store.setLoading(false)
      }, 1000);
      setTimeout(() => {
        router.push("/auth/signin")
      }, 1500);
    }
  }

  return {
    user,

    signIn,
    signUp
  }
})