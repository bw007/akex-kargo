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
        <!-- <el-select v-model="payment.order" placeholder="Mahsulotni tanlang" clearable>
          <el-option v-for="(item, index) in orders" :key="index" :value="item.name" @click="handleChange(item)">
            <el-text size="default">{{ item.firstName + ' ' + item.lastName + ' | ' }}</el-text>
            <el-text type="warning" size="default">{{ item.name }}</el-text>
          </el-option> 
        </el-select> -->
        <el-input disabled v-model="payment.order" />
      </el-form-item>
      <el-form-item label="To'lov miqdori" prop="price">
        <el-input-number v-model="payment.price" :min="1000" :step="10" controls-position="right" placeholder="To'lov miqdorini kiriting" />
      </el-form-item>
      <el-form-item>      
        <el-text type="warning" size="small">Maksimal miqdor {{ (order.price - order.payment).toLocaleString() }} so'm</el-text>
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
import { apiStore } from '@/stores/utils/api';

import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const props = defineProps(['id'])

const api = apiStore()
const dialog_store = dialogStore()
const order_store = orderStore()
const payment_store = paymentStore()

const { paymentToggle } = storeToRefs(dialog_store)

const form = ref()

const payment = ref({})
const order = ref({})

const checkPrice = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("Iltimos maydonni to'ldiring"))
  }
  if (order.value.price/(order.value.payment + value) < 1) {
    console.log(order.value);
    callback(new Error(`To'lovning maksimal miqdori ${(order.value.price - order.value.payment).toLocaleString()} so'm`))
  } else {
    callback()
  }
}

const rules = ref({
  order: [
    { required: true, message: "Iltimos mahsulotni tanlang", trigger: 'change' }
  ],
  price: [
    { validator: checkPrice, trigger: 'blur' }
  ]
})

// const handleChange = (value) => {
//   order.value = value
// }

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

watch(paymentToggle, async () => {
  if (paymentToggle.value && props.id) {
    let res = await api.get({ url: `orders/${props.id}` })
    
    if (res.status == 200) {
      order.value = { ...res.data }
      payment.value.order = res.data.name
      dialog_store.setPaymentToggle(true)
    }
  }
})

const addPayment = async () => {
  if (!form.value) return
  await form.value.validate((valid, fields) => {
    if (valid) {
      order_store.updateOrder({ 
        ...order.value,
        payment: order.value.payment + payment.value.price
      })
      payment_store.addPayment({
        id: String(Date.now()),
        order: order.value.name,
        money: payment.value.price,
        price: order.value.price,
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
  @import url("@/styles/components/payments/payment-dialog.css");
</style>