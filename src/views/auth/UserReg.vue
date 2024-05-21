<template>
  <el-form label-position="top" ref="form" size="large" :model="user" :rules="rules">
    
    <el-text class="title">Ro'yxatdan o'tish</el-text>
    
    <el-steps :active="active" finish-status="success">
      <el-step @click="backForm(0)" />
      <el-step @click="backForm(1)" />
      <el-step @click="backForm(2)" />
    </el-steps>

    <el-form-item v-if="active == 0" label="Ism" prop="firstName">
      <el-input v-model="user.firstName" />
    </el-form-item>

    <el-form-item v-if="active == 0" label="Familiya" prop="lastName">
      <el-input v-model="user.lastName" />
    </el-form-item>

    <el-form-item v-if="active == 1" label="Jins" prop="gender">
      <el-radio-group v-model="user.gender">
        <el-radio border value="Ayol">Ayol</el-radio>
        <el-radio border value="Erkak">Erkak</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item v-if="active == 1" label="Tug'ilgan sana" prop="birth">
      <el-date-picker input-style="" v-model="user.birth" placeholder="Sanani tanlang" />
    </el-form-item>

    <el-form-item v-if="active > 1" label="Email" prop="email">
      <el-input v-model="user.email" />
    </el-form-item>
    
    <el-row v-if="active > 1" :gutter="12">
      <el-col :span="12">
        <el-form-item label="Parol" prop="password">
          <el-input v-model="user.password" type="password" show-password />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="Parolni tasdiqlang" prop="checkPassword">
          <el-input v-model="user.checkPassword" type="password" show-password />
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item class="form__btn">
      <el-button type="primary" @click="handleReg(form)" :loading="loading" round>{{ active > 2 ? 'Yakunlash' : 'Keyingi' }}</el-button>
    </el-form-item>

    <div class="form__links">
      <el-text>
        Hisobingiz bormi?
        <router-link to="/auth/signin">Tizimga kiring</router-link>
      </el-text>
    </div>
  </el-form>
</template>

<script setup>
import { authStore } from '@/stores/auth/auth';
import { loadingStore } from '@/stores/utils/loading';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const loading_store = loadingStore()
const { loading } = storeToRefs(loading_store);

const store = authStore()

const user = ref({
  firstName: '',
  lastName: '',
  gender: '',
  birth: '',
  email: '',
  password: '',
  checkPassword: '',
})

const checkPass = (rule, value, callback) => {
  if (value === '') {
    callback("Iltimos maydonni to'ldiring");
  } else if (value !== user.value.password) {
    callback(new Error("Parollar mos kelmayapti"));
  } else {
    callback();
  }
}

const form = ref();

const rules = ref({
  firstName: [
    { required: true, message: "Iltimos maydonni to'ldiring", trigger: 'blur' },
  ],
  lastName: [
    { required: true, message: "Iltimos maydonni to'ldiring", trigger: 'blur' },
  ],
  gender: [
    { required: true, message: "Iltimos bitta maydonni belgilang", trigger: 'change' },
  ],
  birth: [
    { required: true, message: "Iltimos sanani tanlang", trigger: 'change' },
  ],
  email: [
    { required: true, message: "Iltimos maydonni to'ldiring", trigger: 'blur' },
    { type: 'email', message: "Iltimos, emailni kiriting", trigger: "change" }
  ],
  password: [
    { required: true, message: "Iltimos maydonni to'ldiring", trigger: 'blur' },
    { min: 8, max: 10, message: 'Belgilar soni 8 dan 10 gacha', trigger: 'change' },
  ],
  checkPassword: [
    { validator: checkPass, trigger: 'change' }
  ]
})

const active = ref(0)

const next = () => {
  if (active.value++ > 3) active.value = 0
}

const backForm = (step) => {
  if (step == 0 && user.value.firstName) active.value = 0;
  if (step == 1 && user.value.birth) active.value = 1;
  if (step == 2 && user.value.email) active.value = 2;
}

const handleReg = async () => {
  if (!form.value) return
  await form.value.validate((valid, fields) => {
    if (valid) {
      if (active.value < 3) {
        next()
      } else {
        loading_store.setLoading(true)
        store.signUp({ ...user.value })
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

</script>

<style lang="css" scoped>
@import url("@/styles/auth/reg.css");
</style>