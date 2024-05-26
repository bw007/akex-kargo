<template>
  <el-dialog
    v-model="paymentToggle"
    title="To'lov qo'shish"
    width="450"
    class="payment-modal"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    align-center
  >
    <el-form 
      label-position="top" 
      size="large"
      ref="form"
      @submit.prevent
      :rules="rules"
      :model="payment"
    >
      <el-form-item label="Mahsulot" prop="order">
        <el-select v-model="payment.order" placeholder="Mahsulotni tanlang" clearable>
          <el-option v-for="(item, index) in orders" :key="index" :value="item.name">
            <el-text size="default">{{ item.firstName + ' ' + item.lastName + ' | ' }}</el-text>
            <el-text type="warning" size="default">{{ item.name }}</el-text>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="payment.order" label="To'lov miqdori" prop="price">
        <el-input-number v-model="payment.price" :min="1000" :step="10" controls-position="right" placeholder="To'lov miqdorini kiriting" />
      </el-form-item>

      <el-form-item class="submit">
        <el-button type="danger" @click="handleClose">Bekor qilish</el-button>
        <el-button type="success" @click="addPayment(form)">Qo'shish</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { orderStore } from '@/stores/data/order';
import { dialogStore } from '@/stores/utils/dialog';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';


const dialog_store = dialogStore()
const order_store = orderStore()
const { orders } = storeToRefs(order_store)
const { paymentToggle } = storeToRefs(dialog_store)

const form = ref()

const resetForm = () => {
  if (!form.value) return
  payment.value = {}
  form.value.resetFields()
}

const payment = ref({})

const rules = ref({
  order: [
    { required: true, message: "Iltimos mahsulotni tanlang", trigger: 'change' }
  ],
  price: [
    { required: true, message: "Iltimos maydonni to'ldiring", trigger: 'blur' }
  ]
})

const addPayment = async () => {
  if (!form.value) return
  await form.value.validate((valid, fields) => {
    if (valid) {
      handleClose()
    } else {
      console.log('error submit!', fields)
    }
  })
}

const handleClose = () => {
  resetForm()
  dialog_store.setPaymentToggle(false)
}
</script>

<style lang="css">
  @import url("@/styles/components/orders/payment-dialog.css");
</style>