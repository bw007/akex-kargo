<template>
  <section v-loading="loading">
    <el-card v-loading="loading">
    <template #header>
      <div class="card-header">
        <el-image style="width: 100px; height: 100px" src="order.avatar?.response?.data" fit="cover">
          <template #error>
            <div class="image-slot">
              
            </div>
          </template>
        </el-image>
        <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
        >
          <el-icon>
            <Camera />
          </el-icon>
        </el-upload>
      </div>
    </template>
    <el-row>
      <el-col>
        <el-text class="label">Buyurtmachi:</el-text>
        <el-text>{{ order.firstName }} {{ order.lastName }}</el-text>
      </el-col>
      <el-col>
        <el-text class="label">Mahsulot:</el-text>
        <el-text>{{ order.name }}</el-text>
      </el-col>
      <el-col>
        <el-text class="label">Qabul vaqti:</el-text>
        <el-text>{{ convertDate(order.createdTime, 'full') }}</el-text>
      </el-col>
      <el-col>
        <el-text class="label">Telefon raqami:</el-text>
        <el-text>{{ order.phone }}</el-text>
      </el-col>
      <el-col>
        <el-text class="label">Zaxira raqam:</el-text>
        <el-text>{{ order.phoneReserve }}</el-text>
      </el-col>
      <el-col>
        <el-text class="label">Buyurtma havolasi:</el-text>
        <el-link :href="order.link" type="primary">{{ order.link }}</el-link>
      </el-col>
      <el-col>
        <el-text class="label">Holati:</el-text>
        <el-text :type="order.status ? 'warning' : 'success'">{{ order.status ? '' : 'Yangi' }}</el-text>
      </el-col>
      <el-button @click="dialog_store.setPaymentToggle(true), id = order.id" icon="Money" size="small" title="To'lov" type="warning" plain>To'lov qo'shish</el-button>
      <el-button @click="dialog_store.setEditToggle(true), id = order.id" icon="Edit" size="small" type="primary" plain>Tahrirlash</el-button>
    </el-row>
    <template #footer>
      <el-row>
        <el-col>
          <el-text class="label">Narxi:</el-text>
          <el-text>{{ order.price?.toLocaleString() }} so'm</el-text>
        </el-col>
        <el-col>
          <el-text class="label">To'lov holati:</el-text>
          <el-text :type="order.payment == order.price ? 'success' : 'warning'">
            {{ order.payment == order.price ? "To'langan" : ((order.payment/order.price * 100)?.toFixed(1) + "% | " + order.payment?.toLocaleString()) }} so'm
          </el-text>
        </el-col>
        <el-col>
          <OrderPayments />
        </el-col>
      </el-row>
    </template>
  </el-card>
  <OrderDialog :id="id" />
  <PaymentDialog :id="id" />
  </section>
</template>

<script setup>
import OrderPayments from "./OrderPayments.vue"
import PaymentDialog from "@/components/payments/PaymentDialog.vue"

import { orderStore } from "@/stores/data/order";
import { loadingStore } from "@/stores/utils/loading";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router"
import OrderDialog from "./OrderDialog.vue";
import { dialogStore } from "@/stores/utils/dialog";
import { convertDate } from "@/stores/utils/helper";
import { paymentStore } from "@/stores/data/payment";

const route = useRoute()
const dialog_store = dialogStore()
const loading_store = loadingStore()
const payment_store = paymentStore()
const order_store = orderStore()

const { loading } = storeToRefs(loading_store)
const { order, orders } = storeToRefs(order_store)

onMounted(() => {
  order_store.getOrder(route.params.id)
  payment_store.getOrderPayments(route.params.id)
})

watch(orders, () => {
  order_store.getOrder(route.params.id)
  payment_store.getOrderPayments(route.params.id)
})

const id = ref('')
</script>

<style lang="css" scoped>
@import url("@/styles/components/orders/order-data.css");
</style>