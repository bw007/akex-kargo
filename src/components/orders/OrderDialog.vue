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
          <el-input v-model="order.client.firstName" placeholder="Ism" clearable />
        </el-form-item>
        <el-form-item label="Familiya" prop="lastName">
          <el-input v-model="order.client.lastName" placeholder="Familiya" clearable />
        </el-form-item>
        <el-form-item label="Telefon raqami" prop="phone">
          <el-input v-model="order.client.phone" type="number" placeholder="Telefon raqami" clearable />
        </el-form-item>
        <el-form-item label="Zaxira telefon raqami" prop="phone">
          <el-input v-model="order.client.phone" type="number" placeholder="Telefon raqami" clearable />
        </el-form-item>
        <el-form-item label="Buyurtma nomi" prop="orderName">
          <el-input placeholder="Buyurtma nomini kiriting" />
        </el-form-item>
        <el-form-item label="Buyurtmaga havola" prop="orderLink">
          <el-input v-model="order.link" placeholder="Buyurtma havolasini kiriting" />
        </el-form-item>
        <el-form-item label="Narxi" prop="price">
          <el-input-number v-model="order.price" :min="1000" :step="10" controls-position="right" placeholder="Buyurtma narxini kiriting" />
        </el-form-item>
        <el-form-item label="Oldindan to'lov" prop="payment">
          <el-input-number v-model="order.payment" :min="1000" :step="10" controls-position="right" placeholder="Oldindan to'lov" />
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
          <el-button type="success" @click="addorder(form)">Qo'shish</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { dialogStore } from '@/stores/utils/dialog'
import { storeToRefs } from 'pinia'
import { orderStore } from '@/stores/data/order'
import { url } from '@/stores/utils/env';
import cookies from "vue-cookies";
// import { apiStore } from '@/stores/utils/api';

// const props = defineProps(['id'])

const order_store = orderStore()
const token = cookies.get("token")
// const api = apiStore()
const dialog_store = dialogStore()
const { toggle } = storeToRefs(dialog_store)

const order = ref({
  client: {}
})
const form = ref()

const resetForm = () => {
  if (!form.value) return
  order.value = {
    client: {}
  }
  form.value.resetFields()
}

const rules = ref({
  role: [
    { required: true, message: 'Iltimos qiymatni tanlang', trigger: 'change' }
  ],
  firstName: [
    { required: true, message: "Iltimos maydonni to'ldiring", trigger: 'blur' }
  ],
  lastName: [
    { required: true, message: "Iltimos maydonni to'ldiring", trigger: 'blur' }
  ],
  email: [
    { required: true, message: "Iltimos maydonni to'ldiring", trigger: ['blur', 'change'] },
    { type: 'email', message: 'Iltimos, emailni kiriting', trigger: 'blur' }
  ],
  birth: [
    { required: true, message: 'Iltimos sanani tanlang', trigger: 'change' }
  ],
  password: [
    { required: true, message: "Iltimos maydonni to'ldiring", trigger: 'blur' },
    { min: 8, max: 10, message: 'Belgilar soni 8 dan 10 gacha', trigger: 'change' }
  ]
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

// const addOrder = async () => {
//   if (!form.value) return
//   await form.value.validate((valid, fields) => {
//     if (valid) {
//       if (editToggle.value) {
//         // Update order data
//         order_store.updateorder({ ...order.value })
//           .then(() => {
//             handleClose()
//           })
//       } else {
//         // Add new order
//         order_store.addorder({ ...order.value, createdTime: new Date(), status: false })
//           .then(() => {
//             handleClose()
//           })
//       }
//     } else {
//       console.log('error submit!', fields)
//     }
//   })
// }

// watch(editToggle, async () => {
//   if (editToggle.value && props.id) {
//     let res = await api.get({ url: `orders/${props.id}` })
    
//     if (res.status == 200) {
//       order.value = { ...res.data, password: "" }
//       dialog_store.setToggle(true)
//     }
//   }
// })

const handleClose = () => {
  order.value = {
    client: {}
  }
  dialog_store.setToggle(false)
  dialog_store.setEditToggle(false)
  resetForm()
}

</script>

<style lang="css">
@import url("@/styles/components/orders/order-dialog.css");
</style>
