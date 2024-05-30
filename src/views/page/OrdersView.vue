<template>
  <section>
    <OrderDialog :id="id" />
    <PaymentDialog :id="orderId" />
    <el-row class="add-order" justify="space-between">
      <el-text>{{ $route.meta.title }} ro'yxati</el-text>
      <!-- <el-button disabled @click="dialog_store.setPaymentToggle(true)" icon="Money" type="warning" plain>To'lov</el-button> -->
      <el-button @click="dialog_store.setToggle(true)" icon="Plus" type="success">Yangi</el-button>
    </el-row>
    <OrdersTable v-loading="loading" @addPayment="addPayment" @edit="handleEdit" />
  </section>
</template>

<script setup>
import OrdersTable from "@/components/orders/OrdersTable.vue"
import OrderDialog from "@/components/orders/OrderDialog.vue"
import PaymentDialog from "@/components/payments/PaymentDialog.vue"

import { dialogStore } from "@/stores/utils/dialog";
import { onMounted, ref, watch } from "vue";
import { orderStore } from "@/stores/data/order";
import { authStore } from "@/stores/auth/auth";
import { storeToRefs } from "pinia";
import { loadingStore } from "@/stores/utils/loading";

const dialog_store = dialogStore()
const loading_store = loadingStore()
const order_store = orderStore()
const auth_store = authStore()
const { user } = storeToRefs(auth_store)
const { loading } = storeToRefs(loading_store)

onMounted(() => {
  const fetchOrders = (userId) => {
    if (userId) {
      order_store.getAllOrders(userId);
    }
  };

  const unwatch = watch(user, (newValue) => {
    if (newValue.id) {
      fetchOrders(newValue.id);
      unwatch();
    }
  })

  if (user.value.id) {
    fetchOrders(user.value.id);
  }
})

const id = ref('')
const orderId = ref('')

const handleEdit = (_id) => {
  id.value = _id
}

const addPayment = (_id) => {
  orderId.value = _id
}

</script>

<style lang="css" scoped>
  @import url("@/styles/components/orders/order.css");
</style>