<template>
  <section>
    <OrderDialog />
    <el-row class="add-worker" justify="space-between">
      <el-text>{{ $route.meta.title }} ro'yxati</el-text>
      <el-button @click="dialog_store.setToggle(true)" icon="Plus" type="success">Yangi</el-button>
    </el-row>
    <OrdersTable />
  </section>
</template>

<script setup>

import OrdersTable from "@/components/orders/OrdersTable.vue"
import OrderDialog from "@/components/orders/OrderDialog.vue"
import { dialogStore } from "@/stores/utils/dialog";

const dialog_store = dialogStore()
</script>

<style lang="css" scoped>
  @import url("@/styles/components/orders/order.css");
</style>