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
    <el-scrollbar class="auth__body">
      <RouterView />
    </el-scrollbar>
  </div>
</template>

<script setup></script>

<style lang="css">
.auth {
  height: 100vh;
}
.auth__header {
  display: flex;
  align-items: center;
  position: relative;
  padding: 12px 28px;
}
.auth__link {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}
.auth__logo {
  display: flex;
  align-items: center;
  margin: 0 auto;
}
.el-divider {
  margin: 0;
}
.auth__body {
  height: calc(100vh - 65px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.auth__body .el-scrollbar__wrap {
  display: flex;
  align-items: center;
}

@media screen and (max-height: 540px) {
  .auth__body .el-scrollbar__wrap {
    padding-top: 10px;
    align-items: normal;
  }
}
</style>