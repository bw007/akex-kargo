import { markRaw, ref } from 'vue'
import { defineStore } from 'pinia'

import { apiStore } from '../utils/api'

import { ElMessage, ElMessageBox } from 'element-plus'
import { TrashIcon } from "@heroicons/vue/24/solid";
import { loadingStore } from '../utils/loading';

export const userStore = defineStore('userStore', () => {
  const users = ref([])
  const user = ref({})
  const api = apiStore()
  const loading_store = loadingStore()

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
    loading_store.setLoading(true)
    let res = await api.get({ url: 'users?_sort=id&_order=desc' })

    if (res.status == 200) {
      users.value = [
        ...res.data.filter((u) => u.role == '@super_admin'),
        ...res.data.filter((u) => u.role !== '@super_admin')
      ]
    }
    loading_store.setLoading(false)
  }

  // Get user
  const getUser = async (id) => {
    user.value = {}
    loading_store.setLoading(true)
    let res = await api.get({ url: `users/${id}` });

    if (res.status == 200) {
      user.value = {
        name: {
          first: res.data.firstName,
          last: res.data.lastName
        },
        id: res.data.id,
        email: res.data.email,
        role: res.data.role,
        status: res.data.status,
        avatar: { ...res.data.avatar[0] }
      }
    }
    loading_store.setLoading(false)
  }

  // Update user
  const updateUser = async (payload) => {
    let res = await api.put({ 
      url: `users/${payload.id}`,
      data: { ...payload } 
    })

    if (res.status == 200) {
      users.value = [ ...users.value.map((u) => {
          if (u.id == payload.id) return { ...res.data }
          return u
        })
      ]
      ElMessage({
        type: 'success',
        message: "Muvaffaqiyatli saqlandi"
      })
    } 
  }

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
    user,

    addUser,
    getAllUsers,
    getUser,
    updateUser,
    changeStatus,
    removeUser
  }
})
