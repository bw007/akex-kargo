<template>
  <el-form 
    ref="ruleFormRef"
    :model="user"
    :rules="rules"
    label-position="top"
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
      <el-button size="large" type="primary" plain @click="submitForm(ruleFormRef)" round>Kirish</el-button>
    </el-form-item>
    <div class="form__links">
      <el-text>
        <router-link to="/auth/forgot">Parolingizni unutdingizmi?</router-link>
      </el-text>
      <el-text>
        Hisobingiz yo'qmi?
        <router-link to="/auth/signup">Ro'yxatdan o'ting</router-link>
      </el-text>
    </div>
  </el-form>
</template>

<script setup>
import router from '@/router';
// import { authStore } from '@/stores/auth/auth';
import { ref } from 'vue';

// const store = authStore()

const ruleFormRef = ref()

const user = ref({
  email: '',
  password: '',
})

const rules = ref({
  password: [
    { required: true, message: "Iltimos maydonni to'ldiring", trigger: 'blur' },
    { min: 8, max: 10, message: 'Belgilar soni 8 tadan 10 tagacha', trigger: 'blur' },
  ],
  email: [
    {
      required: true,
      message: "Iltimos maydonni to'ldiring",
      trigger: 'blur',
    },
  ],
})

// const handleLogin = () => {
//   store.login(...user.value)
// }

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      // handleLogin()
      router.push("/")
    } else {
      console.log('error submit!', fields)
    }
  })
}

</script>

<style lang="css" scoped>
@import url("@/styles/auth/login.css");
</style>