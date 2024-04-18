<template>
  <el-form 
    label-position="top"
    ref="ruleFormRef"
    :model="user"
    :rules="rules"
  >
    <el-text class="title">Ro'yxatdan o'tish</el-text>
    <el-steps
      :active="active"
      finish-status="success"
    >
      <el-step :title="active == 0 ? 'Faol' : 'Bajarildi'" />
      <el-step :title="active == 1 ? 'Faol' : active > 1 ? 'Bajarildi' : '2-qadam'" />
      <el-step :title="active == 2 ? 'Faol' : active > 2 ? 'Bajarildi' : '3-qadam'" />
    </el-steps>

    <el-form-item v-if="active == 0" label="Ism" prop="firstName">
      <el-input 
        v-model="user.firstName"
        size="large"
      />
    </el-form-item>

    <el-form-item v-if="active == 0" label="Familiya" prop="lastName">
      <el-input 
        v-model="user.lastName"
        size="large"
      />
    </el-form-item>

    <el-form-item v-if="active == 1" label="Jins" prop="gender">
      <el-radio-group v-model="user.gender">
        <el-radio value="Ayol">Ayol</el-radio>
        <el-radio value="Erkak">Erkak</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item v-if="active == 1" label="Tug'ilgan sana" prop="birth">
      <el-date-picker
        v-model="user.birth"
        placeholder="Sanani tanlang"
        size="large"
      />
    </el-form-item>

    <el-form-item v-if="active > 1" label="Email" prop="email">
      <el-input 
        v-model="user.email"
        size="large"
      />
    </el-form-item>
    
    <el-row v-if="active > 1" :gutter="12">
      <el-col :span="12">
        <el-form-item label="Parol" prop="password">
          <el-input 
            v-model="user.password"
            type="password"
            show-password
            size="large"
          />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="Parolni tasdiqlang">
          <el-input 
          
            type="password"
            show-password
            size="large"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item class="form__btn">
      <el-button size="large" type="primary" plain @click="submitForm(ruleFormRef)" round>{{ active > 2 ? 'Yakunlash' : 'Keyingi' }}</el-button>
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
import { ref } from 'vue';

const user = ref({
  firstName: '',
  lastName: '',
  gender: '',
  birth: '',
  email: '',
  password: '',
})

const ruleFormRef = ref();

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
  ],
  password: [
    { required: true, message: "Iltimos maydonni to'ldiring", trigger: 'blur' },
    { min: 8, max: 10, message: 'Uzunligi 8 dan 10 gacha', trigger: 'blur' },
  ]
})

const active = ref(0)

const next = () => {
  if (active.value++ > 2) active.value = 0
}

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      next()
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
  height: 480px;
  /* background: #00000010; */
  padding: 4px 12px;
  display: flex;
  flex-direction: column;
}
.el-text.title {
  font-size: 24px;
  display: inline-block;
  margin-bottom: 24px;
  color: #333333;
}

.el-steps {
  margin-bottom: 36px;
}
/* .el-text.policy {
  font-size: 13px;
  line-height: 18px;
  text-align: center;
} */
.el-form-item {
  /* margin-bottom: 16px; */
}
.form__links {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin-top: auto; */
}
.el-form-item.form__btn {
  margin-top: auto;
}
.form__links a {
  color: #333333;
}
.form__links .el-text {
  margin-bottom: 10px;
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