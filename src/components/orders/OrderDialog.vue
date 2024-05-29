<template>
  <el-dialog
    v-model="toggle"
    title="Yangi buyurtma"
    width="740"
    class="modal order-modal"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    align-center
  >
    <template #default>
      <el-form
        ref="form"
        @submit.prevent
        size="large"
        :rules="rules"
        :model="order"
        label-position="top"
      >
        <el-form-item label="Ism" prop="firstName">
          <el-input v-model="order.firstName" placeholder="Ism" clearable />
        </el-form-item>
        <el-form-item label="Familiya" prop="lastName">
          <el-input v-model="order.lastName" placeholder="Familiya" clearable />
        </el-form-item>
        <el-form-item label="Telefon raqami" prop="phone">
          <el-input v-model="order.phone" type="tel" v-mask="'+998 (##) ###-##-##'" placeholder="+998 (__) ___-__-__" clearable />
        </el-form-item>
        <el-form-item label="Zaxira telefon raqami" prop="phoneReserve">
          <el-input v-model="order.phoneReserve" type="tel" v-mask="'+998 (##) ###-##-##'" placeholder="+998 (__) ___-__-__" clearable />
        </el-form-item>
        <el-form-item label="Buyurtma nomi" prop="name">
          <el-input v-model="order.name" placeholder="Buyurtma nomini kiriting" />
        </el-form-item>
        <el-form-item label="Buyurtmaga havola" prop="link">
          <el-input v-model="order.link" placeholder="Buyurtma havolasini kiriting" />
        </el-form-item>
        <el-form-item label="Narxi" prop="price">
          <el-input-number 
            v-model="order.price" 
            :min="1000" 
            :step="10" 
            controls-position="right" 
            placeholder="Buyurtma narxini kiriting"
          />
        </el-form-item>
        <el-form-item :label="editToggle ? `To'langan miqdor` : `Oldindan to'lov`">
          <el-input-number 
            :disabled="editToggle" 
            v-model="order.payment"
            :min="1000" 
            :step="10" 
            controls-position="right" 
            :placeholder="editToggle && !order.payment ? '0' : `Oldindan to'lov`"
          />
        </el-form-item>
        <el-form-item label="Buyurtma rasmi">
          <el-upload 
            v-model:file-list="order.avatar"
            :action="`${url}/avatars`"
            :headers="{
              'authorization': `Bearer ${token}`
            }"
            :on-success="fileSuccess"
            :on-error="fileError"
            :limit="1"
            class="upload-demo"
            drag
          >
            <el-icon :size="24" color="#30313390">
              <upload-filled />
            </el-icon>
            <div class="el-upload__text">Faylni shu yerga qo'ying yoki <em>yuklang</em></div>
            <template #tip>
              <div class="el-upload__tip">Hajmi 500 kb dan kam bo'lgan <b>jpg/png</b> fayllar</div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item class="submit">
          <el-button type="danger" @click="handleClose">Bekor qilish</el-button>
          <el-button type="success" @click="addOrder()">{{ editToggle ? "Saqlash" : "Qo'shish" }}</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { url } from '@/stores/utils/env';
import cookies from "vue-cookies";

import { apiStore } from '@/stores/utils/api';
import { authStore } from '@/stores/auth/auth';
import { orderStore } from '@/stores/data/order';
import { dialogStore } from '@/stores/utils/dialog';

const props = defineProps(['id'])

const api = apiStore()
const auth_store = authStore()
const order_store = orderStore()
const dialog_store = dialogStore()

const { toggle, editToggle } = storeToRefs(dialog_store)
const { user } = storeToRefs(auth_store);
const token = cookies.get("token")
const form = ref()

const order = ref({})

const resetForm = () => {
  if (!form.value) return
  order.value = {}
  form.value.resetFields()
}

const checkPhone = (rule, value, cb) => {
  if (!value) {
    return cb(new Error("Iltimos maydonni to'ldiring"))
  }
  if (value.length != "+998 (##) ###-##-##".length) {
    console.log(order.value);
    cb(new Error(`Iltimos telefon to'liq kiriting`))
  } else {
    cb()
  }
}

const rules = ref({
  firstName: [
    { required: true, message: "Iltimos maydonni to'ldiring", trigger: 'blur' }
  ],
  lastName: [
    { required: true, message: "Iltimos maydonni to'ldiring", trigger: 'blur' }
  ],
  phone: [
    { validator: checkPhone, trigger: 'blur' }
  ],
  phoneReserve: [
    { validator: checkPhone, trigger: 'blur' }
  ],
  name: [
    { required: true, message: "Iltimos maydonni to'ldiring", trigger: 'blur' }
  ],
  link: [
    { required: true, message: "Iltimos maydonni to'ldiring", trigger: 'blur' }
  ],
  price: [
    { required: true, message: "Iltimos maydonni to'ldiring", trigger: 'blur' }
  ],
})

const fileSuccess = (response, file) => {
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file.raw)
  }).then((baseString) => {
    order.value.avatar[0].response.data = baseString
  }).catch((e) => {
    console.log(e);
  })
}
const fileError = (file) => {
  console.log(file);
}

const addOrder = async () => {
  if (!form.value) return
  await form.value.validate((valid, fields) => {
    if (valid) {
      if (editToggle.value) {
        order_store.updateOrder({ ...order.value })
      } else {
        order_store.addOrder({ ...order.value, status: 0, id: String(Date.now()), createdTime: new Date(), userId: user.value.id })
      }
      handleClose()
    } else {
      console.log('error submit!', fields)
    }
  })
}

watch(editToggle, async () => {
  if (editToggle.value && props.id) {
    let res = await api.get({ url: `orders/${props.id}` })
    
    if (res.status == 200) {
      order.value = { ...res.data }
      console.log(res.data);
      dialog_store.setToggle(true)
    }
  }
})

const handleClose = () => {
  order.value = {}
  dialog_store.setToggle(false)
  dialog_store.setEditToggle(false)
  resetForm()
}
</script>

<style lang="css">
@import url("@/styles/components/orders/order-dialog.css");
</style>