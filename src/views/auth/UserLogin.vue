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
import { ref } from 'vue';

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

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      router.push("/");
    } else {
      console.log('error submit!', fields)
    }
  })
}

</script>

<style lang="css" scoped>
.el-form {
  width: 392px;
  min-width: 220px;
  display: flex;
  padding: 4px 12px;
  flex-direction: column;
}
.el-text.title {
  font-size: 24px;
  display: inline-block;
  margin-bottom: 24px;
  color: #333333;
}
.el-form-item {
  margin-bottom: 16px;
}
.form__links {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.form__links a {
  color: #333333;
}
.form__links .el-text {
  margin-bottom: 10px;
  text-align: center;
}
.el-button {
  font-weight: 500;
  display: inline-block;
  width: 100%;
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>