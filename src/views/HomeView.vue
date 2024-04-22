<template>
  <section>
    <h1>{{ $route.meta.title }}</h1>
    <el-row :gutter="12">
      <el-col :span="6">
        <el-card>1</el-card>
      </el-col>
      <el-col :span="6">
        <el-card>1</el-card>
      </el-col>
      <el-col :span="6">
        <el-card>1</el-card>
      </el-col>
      <el-col :span="6">
        <el-card>1</el-card>
      </el-col>
    </el-row>
  </section>
</template>

<script setup></script>

<style lang="css" scoped>
.wrapper {
  padding: 10px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-card {
  
}
.auth__block {
  display: flex;
  gap: 10px;
}
h1 {
  margin-bottom: 50px;
}
</style>