import { defineStore } from "pinia";
import { ref } from "vue";
import { apiStore } from "../utils/api";
import { ElMessage } from "element-plus";

export const userStore = defineStore("userStore", () => {
  const user = ref({})
  const api = apiStore()

  const addUser = async (data) => {
    let res = await api.post({ url: "signup", data })

    if (res.status == 201) {
      user.value = { ...res.data.user }
      ElMessage({
        type: "success",
        message: "Muvaffaqiyatli qo'shildi"
      })
    }
  }

  return {
    user,

    addUser
  }
})