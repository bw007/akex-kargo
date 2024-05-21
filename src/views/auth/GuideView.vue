<template>
  <el-collapse v-model="active" accordion>
    <el-collapse-item title="Loyiha haqida" name="1">
      <el-text size="small">
        Loyiha yuk yetkazib berish xizmati xodimlari ishini yengillashtirishga mo'ljallangan.
      </el-text>
    </el-collapse-item>
    <el-collapse-item title="Foydalanilgan texnologiyalar" name="2">
      <el-text size="small">
        Loyihaning frontend qismi uchun Vue.js freymvorkidan, UI uchun Element-UI kutubxonasidan, Rest API uchun 
        <a href="https://www.npmjs.com/package/json-server">json-server</a> instrumentidan, avtorizatsiya uchun 
        <a href="https://www.npmjs.com/package/json-server-auth">json-server-auth</a>dan foydalanilmoqda
      </el-text>
    </el-collapse-item>
    <el-collapse-item title="Ishga tushirish" name="3">
      <el-text size="small">
        Loyiha uchun sozlangan json-serverning kerakli versiyasi manzili:
        <a href="https://github.com/bw007/json-server">githubga havola</a>.
        <br>
        Terminal orqali: <br>
        <code>git clone https://github.com/bw007/json-server.git</code>
        <br>
        <code>cd json-server</code>
        <br>
        <code>npm install</code>
        <br>
        <code>npm start</code>
      </el-text>
    </el-collapse-item>
    <el-collapse-item title="Bog'lanish" name="4">
      <el-text size="small">
        <b>Tel:</b> (90) 722-68-92
        <br>
        <b>Telegram:</b> <a target="_blank" href="https://t.me/bw00791">@bw00791</a>
        <br>
        <b>Email:</b> <a href="mailto:mr.khasanov02@gmail.com">mr.khasanov02@gmail.com</a>
        <br>
        <b>Github:</b> <a href="https://github.com/bw007">https://github.com/bw007</a>
      </el-text>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup>
import { ref } from 'vue';

const active = ref('1')
</script>

<style lang="css" scoped>
.el-collapse {
  width: 500px;
}
</style>