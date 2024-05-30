<template>
  <section>
    <el-row class="add-order" justify="space-between">
      <el-text>{{ $route.meta.title }} ro'yxati</el-text>
    </el-row>
    <PaymentsTable v-loading="loading" />
  </section>
</template>

<script setup>
import { onMounted, watch } from "vue";
import PaymentsTable from "@/components/payments/PaymentsTable.vue"

import { paymentStore } from "@/stores/data/payment";
import { authStore } from "@/stores/auth/auth";
import { storeToRefs } from "pinia";
import { loadingStore } from "@/stores/utils/loading";

const auth_store = authStore()
const loading_store = loadingStore()
const payment_store = paymentStore()

const { user } = storeToRefs(auth_store)
const { loading } = storeToRefs(loading_store)

onMounted(() => {
  const fetchPayments = (userId) => {
    if (userId) {
      payment_store.getAllpayments(userId);
    }
  };

  const unwatch = watch(user, (newValue) => {
    if (newValue.id) {
      fetchPayments(newValue.id);
      unwatch();
    }
  })

  if (user.value.id) {
    fetchPayments(user.value.id);
  }
})

</script>

<style lang="css" scoped>
@import url("@/styles/components/payments/payment.css");
</style>