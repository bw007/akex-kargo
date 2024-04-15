<template>
  <div class="auth">
    <header class="auth__header">
      <router-link class="auth__link" to="/">
        <el-icon color="#000000" size="24">
          <Back />
        </el-icon>  
      </router-link>
      <router-link class="auth__logo" to="/">
        <img src="@/assets/imgs/logo.svg" />
      </router-link>
    </header>
    <el-divider />
    <section class="auth__form">
      <RouterView />
    </section>
  </div>
</template>

<script setup></script>

<style lang="css" scoped>
.auth__header {
  display: flex;
  align-items: center;
  padding: 12px 28px;
  position: relative;
}
.auth__link {
  position: absolute;
}
.auth__logo {
  display: flex;
  align-items: center;
  margin: 0 auto;
}
.el-divider {
  margin: 0;
}
.auth__form {
  padding: 12px 28px;
  height: calc(100vh - 65px);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>