<template>
  <el-table :data="paymentsData" empty-text="Ma'lumot yo'q">
    <el-table-column label="To'lov miqdori" min-width="140">
      <template #default="list">
        UZS | <el-text type="warning">{{ list.row.money?.toLocaleString() }}</el-text>
      </template>
    </el-table-column>
    <el-table-column label="Mahsulot nomi" min-width="160" prop="order" />
    <el-table-column label="To'lov vaqti" min-width="120" prop="createdTime" />
    <el-table-column label="Buyurtmachi" min-width="140" prop="client" />
    <el-table-column align="right" min-width="120"></el-table-column>
  </el-table>
</template>

<script setup>
import { computed } from "vue"
import { storeToRefs } from "pinia"
import { paymentStore } from "@/stores/data/payment";
import { convertDate } from '@/stores/utils/helper';

const payment_store = paymentStore()
const { payments } = storeToRefs(payment_store)

const paymentsData = computed(() => {
  return payments.value.map(payment => {
    return {
      ...payment,
      createdTime: convertDate(payment.createdTime, 'full')
    }
  })
})

</script>

<style lang="css" scoped>
  
</style>