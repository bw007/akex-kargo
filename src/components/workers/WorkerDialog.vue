<template>
  <el-dialog
    v-model="toggle"
    title="Yangi xodim"
    width="740"
    class="modal"
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
          <el-select v-model="user.role" placeholder="Lavozim">
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
          <el-button type="danger" @click="dialog_store.setToggle(false), resetForm()">Bekor qilish</el-button>
          <el-button type="success" @click="addUser(form)">Qo'shish</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { dialogStore } from '@/stores/utils/dialog'
import { storeToRefs } from 'pinia'
import { userStore } from '@/stores/data/user'
import { url } from '@/stores/utils/env';
import cookies from "vue-cookies";
// import { apiStore } from '@/stores/utils/api';

const user_store = userStore()
const token = cookies.get("token")
// const api = apiStore()
const dialog_store = dialogStore()
const { toggle } = storeToRefs(dialog_store)

const user = reactive({
  role: '',
  firstName: '',
  lastName: '',
  email: '',
  birth: '',
  password: '',
  avatar: []
})
const form = ref()

const resetForm = () => {
  if (!form.value) return
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
    user.avatar[0].response.data = baseString
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
      user_store.addUser({ ...user, createdTime: new Date(), status: false })
        .then(() => {
          dialog_store.setToggle(false)
          resetForm()
        })
    } else {
      console.log('error submit!', fields)
    }
  })
}

</script>

<style lang="css">
@import url("@/styles/components/workers/worker-dialog.css");
</style>
