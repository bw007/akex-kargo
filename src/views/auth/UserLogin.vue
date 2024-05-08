<template>
  <el-form 
    ref="form"
    :model="user"
    :rules="rules"
    label-position="top"
    @submit.prevent
  >
    <el-text class="title">Tizimga kirish</el-text>
    <el-form-item label="Email" prop="email">
      <el-input 
        v-model="user.email"
        size="large"
      />
    </el-form-item>
    <el-form-item label="Parol" prop="password">
      <el-input 
        v-model="user.password" 
        show-password
        type="password"
        size="large"
      />
    </el-form-item>
    <el-form-item>
      <el-checkbox
        v-model="user.remember"
        label="Meni eslab qoling"
      />
    </el-form-item>
    <el-form-item>
      <el-button size="large" type="primary" :loading="loading" @click="handleLogin(form)" round>Kirish</el-button>
    </el-form-item>
    <div class="form__links">
      <!-- <el-text>
        Parolingizni unutdingizmi?
        <router-link to="/auth/forgot">Parolni tiklash</router-link>
      </el-text> -->
      <el-text>
        Loyihani ishlatib ko'rish uchun
        <router-link to="/auth/guide">yo'riqnoma</router-link>
      </el-text>
    </div>
  </el-form>
</template>

<script setup>
import { authStore } from '@/stores/auth/auth';
import { loadingStore } from '@/stores/utils/loading';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const auth_store = authStore()
const loading_store = loadingStore()
const { loading } = storeToRefs(loading_store);

const form = ref()

const user = ref({
  email: '',
  password: '',
  remember: false,
})

const rules = ref({
  password: [
    { required: true, message: "Iltimos maydonni to'ldiring", trigger: 'blur' },
    { min: 8, max: 10, message: 'Belgilar soni 8 tadan 10 tagacha', trigger: 'blur' },
  ],
  email: [
    { required: true, message: "Iltimos maydonni to'ldiring", trigger: 'blur' },
    { type: 'email', message: "Iltimos, emailni kiriting", trigger: [ "blur", "change" ] }
  ],
})

const handleLogin = async () => {
  if (!form.value) return
  await form.value.validate((valid, fields) => {
    if (valid) {
      loading_store.setLoading(true)
      auth_store.signIn({ ...user.value })
    } else {
      console.log('error submit!', fields)
    }
  })
}

</script>

<style lang="css" scoped>
@import url("@/styles/auth/login.css");
</style>