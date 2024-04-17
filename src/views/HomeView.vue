<template>
  <div class="wrapper">
    Dashboard
    <div class="auth__block">
      <router-link to="/auth/signin">Sign In</router-link>
      <router-link to="/auth/signup">Sign Up</router-link>
    </div>
  </div>
</template>

<script setup></script>

<style lang="css">
  .wrapper {
    padding: 10px 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .auth__block {
    display: flex;
    gap: 10px;
  }
</style>