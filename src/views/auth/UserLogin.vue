<template>
  <el-form label-position="top">
    <el-text class="title">Log in</el-text>
    <el-form-item label="Email address or user name">
      <el-input v-model="user.email" />
    </el-form-item>
    <el-form-item label="Password">
      <el-input 
        v-model="user.password" 
        show-password
        type="password"
      />
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="user.remember" label="Remember me" />
    </el-form-item>
    <el-form-item>
      <el-text class="policy">
        By continuing, you agree to the
        <router-link to="/terms">Terms of use</router-link>
        and
        <router-link to="/policy">Privacy Policy</router-link>
      </el-text>
      <el-button size="large" type="primary" round>Log in</el-button>
    </el-form-item>
    <el-form-item class="forget-password">
      <router-link to="/auth/forget">Forget your password</router-link>
    </el-form-item>
    <el-form-item>
      <el-text>
        Don't have an acount?
        <router-link to="/auth/reg">Sign up</router-link>
      </el-text>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue';

const user = ref({
  user: "",
  remember: false,
});

</script>

<style lang="css" scoped>
.el-form {
  width: 100%;
  max-width: 380px;
  min-width: 220px;
}
.el-text.title {
  font-size: 24px;
  display: inline-block;
  margin-bottom: 28px;
  font-weight: 500;
  color: #333333;
}
.el-text.policy {
  font-size: 12px;
  text-align: center;
}
.el-form-item {
  margin-bottom: 14px;
}
.el-button {
  font-weight: 500;
  display: inline-block;
  width: 100%;
  font-size: 15px;
  margin-top: 10px;
}
</style>