import { markRaw, ref } from 'vue'
import { defineStore } from 'pinia'

import { apiStore } from '../utils/api'

import { ElMessage, ElMessageBox } from 'element-plus'
import { TrashIcon } from "@heroicons/vue/24/solid";

export const userStore = defineStore('userStore', () => {
  const users = ref([])
  const api = apiStore()

  // Add user
  const addUser = async (data) => {
    let res = await api.post({ url: 'signup', data })

    if (res.status == 201) {
      ElMessage({
        type: 'success',
        message: "Muvaffaqiyatli qo'shildi"
      })

      users.value = [
        ...users.value.filter((u) => u.role == '@super_admin'),
        { ...res.data.user },
        ...users.value.filter((u) => u.role !== '@super_admin')
      ]
    }
  }

  // Get all users
  const getAllUsers = async () => {
    let res = await api.get({ url: 'users?_sort=id&_order=desc' })

    if (res.status == 200) {
      users.value = [
        ...res.data.filter((u) => u.role == '@super_admin'),
        ...res.data.filter((u) => u.role !== '@super_admin')
      ]
      console.log(users.value)
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
  const removeUser = (id) => {
    ElMessageBox.confirm("Ma'lumot o'chirilmoqda. Davom ettirilsinmi?", "Ogohlantirish", {
      confirmButtonText: "Ha",
      cancelButtonText: "Yo'q",
      type: 'error',
      icon: markRaw(TrashIcon)
    })
      .then(async () => {
        await api.del({ url: `users/${id}` })
        ElMessage({
          type: 'success',
          message: "Muvaffaqiyatli o'chirildi"
        })
        users.value = [
          ...users.value.filter((u) => u.role == '@super_admin'),
          ...users.value.filter((u) => (u.role !== '@super_admin' && u.id != id))
        ]
      })
      .catch(() => {
        console.log('Cancel')
      })
  }

  // Change status user
  // const changeStatusUser = (id) => {

  // }

  return {
    users,

    // getUser,
    addUser,
    getAllUsers,
    removeUser
  }
})
