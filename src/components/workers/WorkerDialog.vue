<template>
  <el-dialog 
    v-model="toggle" 
    title="Yangi xodim" 
    width="740" 
    class="modal" 
    :before-close="handleClose"
    :close-on-click-modal="false" 
    :close-on-press-escape="false"
  >
    <template #default>
      <el-form ref="form" @submit.prevent size="large" :rules="rules" :model="user" label-position="top">
        <el-form-item label="Ism" prop="firstName">
          <el-input v-model="user.firstName" placeholder="Ism" clearable />
        </el-form-item>
        <el-form-item label="Familiya" prop="lastName">
          <el-input v-model="user.lastName" placeholder="Familiya" clearable />
        </el-form-item>
        <el-form-item label="Lavozim" prop="role">
          <el-select v-model="user.role" placeholder="Lavozim">
            <el-option label="Admin" :value="0" />
            <el-option label="Operator" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="user.email" type="email" placeholder="Email" clearable />
        </el-form-item>
        <el-form-item label="Tug'ilgan sana" prop="birth">
          <el-date-picker v-model="user.birth" placeholder="Sanani tanlang" />
        </el-form-item>
        <el-form-item label="Jins" prop="gender">
          <el-radio-group v-model="user.gender">
            <el-radio border value="Ayol">Ayol</el-radio>
            <el-radio border value="Erkak">Erkak</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Avatar">
          <el-upload 
            class="upload-demo" 
            drag 
            multiple
          >
            <el-icon :size="24" color="#30313390">
              <upload-filled />
            </el-icon>
            <div class="el-upload__text">
              Faylni shu yerga qo'ying yoki <em>yuklang</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                Hajmi 500 kb dan kam bo'lgan <b>jpg/png</b> fayllar
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item class="submit">
          <el-button type="danger" @click="dialog.setToggle(false), resetForm(form)">Bekor qilish</el-button>
          <el-button type="success" @click="addWorker(form)">Qo'shish</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { dialogStore } from '@/stores/utils/dialog';
import { storeToRefs } from 'pinia';

const dialog = dialogStore();
const { toggle } = storeToRefs(dialog);

const user = reactive({
  role: '',
  firstName: '',
  lastName: '',
  email: '',
  birth: '',
  createdtime: '',
  gender: '',
  password: '',
})
const form = ref()

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}


const rules = ref({
  role: [
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

const handleClose = () => {
  dialog.setToggle(false);
}

const addWorker = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!');
      dialog.setToggle(false);
    } else {
      console.log('error submit!', fields)
    }
  })
}

</script>

<style lang="css">
.upload-demo .el-upload-dragger {
  padding: 10px;
}
.el-date-editor {
  width: 100% !important;
}
.modal .el-form {
  display: flex;
  flex-wrap: wrap;
  gap: 2%;
}
.modal .el-form .el-form-item {
  width: 49%;
}
.el-form-item.submit {
  /* display: flex; */
  width: 100% !important;
  justify-content: center
}
.el-form-item.submit .el-button {
  width: 25%;
  min-width: 100px;
}

.modal .el-form .el-form-item__label {
  margin-bottom: 4px !important;
}
.modal .el-form .el-form-item__content {
  line-height: 20px;
}

@media only screen and (max-width: 767px) {
  .modal {
    width: 90%;
    min-width: 240px;
  }
  .el-form-item.submit .el-form-item__content {
    justify-content: center;
    flex-wrap: nowrap;
  }
}
@media only screen and (max-width: 540px) {
  .modal .el-form .el-form-item {
    width: 100%;
  }
}
</style>