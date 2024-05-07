import { defineStore } from "pinia";
import { ref } from "vue";
import { apiStore } from "../utils/api";
import { ElMessage } from "element-plus";

export const userStore = defineStore("userStore", () => {
  const users = ref([])
  const api = apiStore()

  // Add user
  const addUser = async (data) => {
    let res = await api.post({ url: "signup", data })

    if (res.status == 201) {
      ElMessage({
        type: "success",
        message: "Muvaffaqiyatli qo'shildi"
      })
      users.value = [ { ...res.data.user }, ...users.value ]
    }
  }

  // Get all users
  const getAllUsers = async () => {
    let res = await api.get({ url: "users" })

    if (res.status == 200) {
      users.value = [ ...res.data ]
      console.log(users.value);
    }
  }
  
  // Get user
  // const getUser = async (id) => {
  //   return await api.get({ url: "users" })
  // }

  // Update user
  // const updateUser = async (id) => {

  // }

  // Remove user
  // const removeUser = async (id) => {

  // }

  // Change status user
  // const changeStatusUser = (id) => {

  // }

  return {
    users,

    // getUser,
    addUser,
    getAllUsers
  }
})