<template>
  <el-container>
    <el-header>
      <router-link class="link" to="/">
        <el-icon color="#000000" size="24">
          <Back />
        </el-icon>  
      </router-link>
      <router-link class="logo" to="/">
        <img src="@/assets/imgs/logo.svg" />
      </router-link>
    </el-header>
    <el-divider />
    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>

<script setup></script>

<style lang="css" scoped>
.el-header {
  display: flex;
  align-items: center;
  position: relative;
}
.el-divider {
  margin: 0;
}
.el-main {
  height: calc(100vh - 65px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.link {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo {
  display: flex;
  align-items: center;
  margin: 0 auto;
}

@media screen and (max-height: 540px) {
  .el-main {
    padding-top: 10px;
    align-items: normal;
  }
}
</style>