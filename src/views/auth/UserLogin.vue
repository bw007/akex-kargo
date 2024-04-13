<template>
  <el-form label-position="top">
    <el-text class="title">Log in</el-text>
    <el-form-item label="Email address or user name">
      <el-input v-model="user.email" />
    </el-form-item>
    
    <el-form-item label="Password">
      <el-input v-model="user.password" show />
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="user.remember">Not disabled</el-checkbox>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue';

const user = ref({});
</script>

<style lang="css" scoped>
.el-form {

}
.title {
  font-size: 24px;
}
.el-form-item {

}
</style>