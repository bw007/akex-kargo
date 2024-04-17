<template>
  <el-form label-position="top">
    <el-text class="title">Ro'yxatdan o'tish</el-text>

    <el-row :gutter="12">
      <el-col :span="12">
        <el-form-item label="Ism">
          <el-input 
            v-model="user.firstName"
            size="large"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Familiya">
          <el-input 
            v-model="user.lastName"
            size="large"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="Email">
      <el-input 
        v-model="user.email"
        size="large"
      />
    </el-form-item>

    <el-row :gutter="12">
      <el-col :span="12">
        <el-form-item label="Parol">
          <el-input 
            v-model="user.password"
            show-password
            type="password"
            size="large"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Parolni tasdiqlash">
          <el-input 
          
            show-password
            type="password"
            size="large"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item>
      <el-checkbox
        v-model="user.remember"
        label="Parolni ko'rsatish"
      />
    </el-form-item>
    <el-form-item>
      <!-- <el-text class="policy">
        Davom etish orqali
        <router-link to="/terms">Foydalanish shartlari</router-link>
        va
        <router-link to="/policy">Maxfiylik siyosatiga</router-link>
        rozilik bildirasiz
      </el-text> -->
      <el-button size="large" type="primary" round>Kirish</el-button>
    </el-form-item>
    <div class="form__links">
      <el-text>
        <router-link to="/auth/forget">Mahfiy kalitingizni unutdingizmi?</router-link>
      </el-text>
      <el-text>
        Hisobingiz yo'qmi?
        <router-link to="/auth/signin">Ro'yxatdan o'ting</router-link>
      </el-text>
    </div>
  </el-form>
</template>

<script setup>
import { ref } from 'vue';

const user = ref({
  email: "",
  password: "",
  remember: false,
});

</script>

<style lang="css" scoped>
.el-form {
  width: 380px;
  min-width: 220px;
}
.el-text.title {
  font-size: 24px;
  display: inline-block;
  margin-bottom: 24px;
  font-weight: 500;
  color: #333333;
}
/* .el-text.policy {
  font-size: 13px;
  line-height: 18px;
  text-align: center;
} */
.el-form-item {
  margin-bottom: 16px;
}
.form__links {
  display: flex;
  flex-direction: column;
  align-items: center;
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