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
        <el-text class="label" tag="b">Buyurtmachi:</el-text>
        <el-text>{{ order.firstName }} {{ order.lastName }}</el-text>
      </el-col>
      <el-col>
        <el-text class="label" tag="b">Mahsulot:</el-text>
        <el-text>{{ order.name }}</el-text>
      </el-col>
      <el-col>
        <el-text class="label" tag="b">Qabul vaqti:</el-text>
        <el-text>{{ convertDate(order.createdTime, 'full') }}</el-text>
      </el-col>
      <el-col>
        <el-text class="label" tag="b">Telefonlar:</el-text>
        <el-text>
          ({{ order.phone?.slice(0, 2) }})
          {{ order.phone?.slice(2, 5) }}-{{ order.phone?.slice(5, 7) }}-{{ order.phone?.slice(7, 9) }} |
          ({{ order.phoneReserve?.slice(0, 2) }})
          {{ order.phoneReserve?.slice(2, 5) }}-{{ order.phoneReserve?.slice(5, 7) }}-{{ order.phoneReserve?.slice(7, 9) }}
        </el-text>
      </el-col>
      <el-col>
        <el-text class="label" tag="b">Buyurtma havolasi:</el-text>
        <el-link :href="order.link" type="primary">{{ order.link }}</el-link>
      </el-col>
      <el-col>
        <el-text class="label" tag="b">Holati:</el-text>
        <el-text :type="order.status ? 'warning' : 'success'">{{ order.status ? '' : 'Yangi' }}</el-text>
      </el-col>
      <el-button @click="dialog_store.setEditToggle(true), id = order.id" icon="Edit" type="primary" plain/>
    </el-row>
    <template #footer>
      <el-row>
        <el-col>
          <el-text class="label" tag="b">Narxi:</el-text>
          <el-text>{{ order.price?.toLocaleString() }} so'm</el-text>
        </el-col>
        <el-col>
          <el-text class="label" tag="b">To'langan:</el-text>
          <el-text>{{ order.payment?.toLocaleString() }} so'm</el-text>
        </el-col>
        <el-col>
          <OrderPayments />
        </el-col>
      </el-row>
    </template>
  </el-card>
  <OrderDialog :id="id" />
  </section>
</template>

<script setup>
import OrderPayments from "./OrderPayments.vue"

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
.el-button {
  width: 34px;
  height: 32px;
}
</style>