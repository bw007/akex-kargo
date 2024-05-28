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
          <el-option v-for="(item, index) in orders" :key="index" :value="item.name" @click="handleChange(item)">
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
import { paymentStore } from '@/stores/data/payment';
import { dialogStore } from '@/stores/utils/dialog';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';


const dialog_store = dialogStore()
const order_store = orderStore()
const payment_store = paymentStore()

const { orders } = storeToRefs(order_store)
const { paymentToggle } = storeToRefs(dialog_store)

const form = ref()

const payment = ref({})
const order = ref({})

const rules = ref({
  order: [
    { required: true, message: "Iltimos mahsulotni tanlang", trigger: 'change' }
  ],
  price: [
    { required: true, message: "Iltimos maydonni to'ldiring", trigger: 'blur' }
  ]
})

const handleChange = (value) => {
  order.value = value
}

const handleClose = () => {
  resetForm()
  dialog_store.setPaymentToggle(false)
}

const resetForm = () => {
  if (!form.value) return
  payment.value = {}
  order.value = {}
  form.value.resetFields()
}

const addPayment = async () => {
  if (!form.value) return
  await form.value.validate((valid, fields) => {
    if (valid) {
      order_store.updateOrder({ 
        ...order.value,
        payment: order.value.payment + payment.value.price
      })
      payment_store.addPayment({
          order: order.value.name,
          money: payment.value.price,
          client: order.value.firstName + ' ' + order.value.lastName,
          createdTime: new Date(), 
          userId: order.value.userId,
          orderId: order.value.id
        })
      handleClose()
    } else {
      console.log('error submit!', fields)
    }
  })
}


</script>

<style lang="css">
  @import url("@/styles/components/orders/payment-dialog.css");
</style>