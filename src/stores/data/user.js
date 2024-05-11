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
  // const updateUser = async (payload) => {
    
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
        users.value = [ ...users.value.filter((u) => (u.id != id)) ]
      })
      .catch(() => {
        console.log('Cancel')
      })
  }

  // Change status
  const changeStatus = (payload) => {
    ElMessageBox.prompt( "Foydalanuvchi parolini tering", !payload.status ? "Foydalanuvchini faollashtirish" : "Foydalanuvchini cheklash", {
      confirmButtonText: "Ha",
      cancelButtonText: "Yo'q",
      inputPattern: /^[A-Za-z\d]{8,10}$/,
      inputErrorMessage: 'Belgilar soni 8 tadan 10 tagacha',
      type: 'warning'
    })
      .then(async (data) => {
        console.log(data);
        await api.put({ 
          url: `users/${payload.id}`, 
          data: { ...payload, password: data.value, status: !payload.status } 
        })
        users.value = [ ...users.value.map((u) => {
              if (u.id == payload.id) return {
                ...u,
                status: !u.status
              }
              return u
            })
          ]
        ElMessage({
          type: 'success',
          message: !payload.status ? "Foydalanuvchi faollashtirildi" : "Foydalanuvchi cheklandi"
        })
      })
      .catch((e) => {
        console.log(e)
      })

  }

  return {
    users,

    addUser,
    getAllUsers,
    // getUser,
    updateUser,
    changeStatus,
    removeUser,
  }
})
