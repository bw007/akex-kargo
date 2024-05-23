<template>
  <el-dialog
    v-model="toggle"
    title="Yangi xodim"
    width="740"
    class="modal"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    align-center
  >
    <template #default>
      <el-form
        ref="form"
        @submit.prevent
        size="large"
        :rules="rules"
        :model="user"
        label-position="top"
      >
        <el-form-item label="Ism" prop="firstName">
          <el-input v-model="user.firstName" placeholder="Ism" clearable />
        </el-form-item>
        <el-form-item label="Familiya" prop="lastName">
          <el-input v-model="user.lastName" placeholder="Familiya" clearable />
        </el-form-item>
        <el-form-item label="Lavozim" prop="role">
          <el-select :disabled="['@super_admin'].includes(user.role)" v-model="user.role" placeholder="Lavozim">
            <el-option label="Admin" :value="0" />
            <el-option label="Operator" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="Tug'ilgan sana" prop="birth">
          <el-date-picker v-model="user.birth" placeholder="Sanani tanlang" />
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="user.email" type="email" placeholder="Email" clearable />
        </el-form-item>
        <el-form-item label="Parol" prop="password">
          <el-input v-model="user.password" type="password" show-password placeholder="Parol" />
        </el-form-item>
        <el-form-item label="Avatar">

          <el-upload 
            v-model:file-list="user.avatar"
            :action="`${url}/avatars`"
            :headers="{
              'authorization': `Bearer ${token}`
            }"
            :on-success="fileSuccess"
            :on-error="fileError"
            :limit="1"
            class="upload-demo"
            drag
          >
            <el-icon :size="24" color="#30313390">
              <upload-filled />
            </el-icon>
            <div class="el-upload__text">Faylni shu yerga qo'ying yoki <em>yuklang</em></div>
            <template #tip>
              <div class="el-upload__tip">Hajmi 500 kb dan kam bo'lgan <b>jpg/png</b> fayllar</div>
            </template>
          </el-upload>

        </el-form-item>
        <el-form-item class="submit">
          <el-button type="danger" @click="handleClose">Bekor qilish</el-button>
          <el-button type="success" @click="addUser(form)">{{ editToggle ? "Saqlash" : "Qo'shish" }}</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { dialogStore } from '@/stores/utils/dialog'
import { storeToRefs } from 'pinia'
import { userStore } from '@/stores/data/user'
import { url } from '@/stores/utils/env';
import cookies from "vue-cookies";
import { apiStore } from '@/stores/utils/api';

const props = defineProps(['id'])

const user_store = userStore()
const token = cookies.get("token")
const api = apiStore()
const dialog_store = dialogStore()
const { toggle, editToggle } = storeToRefs(dialog_store)

const user = ref({})
const form = ref()

const resetForm = () => {
  if (!form.value) return
  user.value = {}
  form.value.resetFields()
}

const rules = ref({
  role: [
    { required: true, message: 'Iltimos qiymatni tanlang', trigger: 'change' }
  ],
  firstName: [
    { required: true, message: "Iltimos maydonni to'ldiring", trigger: 'blur' }
  ],
  lastName: [
    { required: true, message: "Iltimos maydonni to'ldiring", trigger: 'blur' }
  ],
  email: [
    { required: true, message: "Iltimos maydonni to'ldiring", trigger: ['blur', 'change'] },
    { type: 'email', message: 'Iltimos, emailni kiriting', trigger: 'blur' }
  ],
  birth: [
    { required: true, message: 'Iltimos sanani tanlang', trigger: 'change' }
  ],
  password: [
    { required: true, message: "Iltimos maydonni to'ldiring", trigger: 'blur' },
    { min: 8, max: 10, message: 'Belgilar soni 8 dan 10 gacha', trigger: 'change' }
  ]
})

const fileSuccess = (response, file) => {
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file.raw)
  }).then((baseString) => {
    user.value.avatar[0].response.data = baseString
  }).catch((e) => {
    console.log(e);
  })
}
const fileError = (file) => {
  console.log(file);
}

const addUser = async () => {
  if (!form.value) return
  await form.value.validate((valid, fields) => {
    if (valid) {
      if (editToggle.value) {
        // Update user data
        user_store.updateUser({ ...user.value })
          .then(() => {
            handleClose()
          })
      } else {
        // Add new user
        user_store.addUser({ ...user.value, createdTime: new Date(), status: false })
          .then(() => {
            handleClose()
          })
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

watch(editToggle, async () => {
  if (editToggle.value && props.id) {
    let res = await api.get({ url: `users/${props.id}` })
    
    if (res.status == 200) {
      user.value = { ...res.data, password: "" }
      dialog_store.setToggle(true)
    }
  }
})

const handleClose = () => {
  user.value = {}
  dialog_store.setToggle(false)
  dialog_store.setEditToggle(false)
  resetForm()
}

</script>

<style lang="css">
@import url("@/styles/components/workers/worker-dialog.css");
</style>
