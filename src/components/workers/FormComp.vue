<template>
  <el-form ref="ruleFormRef" :rules="rules" :model="user" label-position="top">
    <el-form-item label="Lavozim" prop="rank">
      <el-select v-model="user.rank" placeholder="Lavozim">
        <el-option label="Admin" :value="0" />
        <el-option label="Operator" :value="1" />
      </el-select>
    </el-form-item>
    <el-form-item label="Ism" prop="firstName">
      <el-input v-model="user.firstName" placeholder="Ism" clearable />
    </el-form-item>
    <el-form-item label="Familiya" prop="lastName">
      <el-input v-model="user.lastName" placeholder="Familiya" clearable />
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input v-model="user.email" type="email" placeholder="Email" clearable />
    </el-form-item>
    <el-form-item>
      <el-upload
        class="upload-demo"
        drag
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        multiple
      >
        <el-icon><upload-filled /></el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
        </template>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="success" @click="onSubmit">Qo'shish</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'

const ruleFormRef = ref()

const user = reactive({
  rank: '',
  firstName: '',
  lastName: '',
  email: ''
})

const rules = ref({
  rank: [
    {
      required: true,
      message: "Iltimos qiymatni tanlang",
      trigger: 'change',
    },
  ],
  firstName: [
    {
      required: true,
      message: "Iltimos maydonni to'ldiring",
      trigger: "blur",
    }
  ],
  lastName: [
    {
      required: true,
      message: "Iltimos maydonni to'ldiring",
      trigger: "blur",
    }
  ],
  email: [
    {
      required: true,
      message: "Iltimos maydonni to'ldiring",
      trigger: [ "blur", "change" ],
    },
    {
      type: 'email',
      message: "Iltimos, emailni kiriting",
      trigger: [ "blur", "change" ],
    }
  ]
})

const onSubmit = () => {
  console.log('submit!')
}
</script>

<style lang="css">
  
</style>