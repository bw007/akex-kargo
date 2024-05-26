<template>
  <section>
    <el-row class="add-order" justify="space-between">
      <el-text>{{ $route.meta.title }} ro'yxati</el-text>
      <el-button @click="dialog_store.setToggle(true)" icon="Plus" type="success">Yangi</el-button>
    </el-row>
    <TransactionsTable />
  </section>
</template>

<script setup>
import TransactionsTable from "@/components/transactions/TransactionsTable.vue"
</script>

<style lang="css" scoped>
@import url("@/styles/components/transactions/transaction.css");
</style>