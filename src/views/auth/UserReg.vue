<template>
  <el-form label-position="top">
    <el-text class="title">Ro'yxatdan o'tish</el-text>

    <el-steps
      :active="active"
      finish-status="success"
    >
      <el-step :title="active == 0 ? 'Jarayonda' : 'Bajarildi'" />
      <el-step :title="active == 1 ? 'Jarayonda' : active > 1 ? 'Bajarildi' : '2-qadam'" />
      <el-step :title="active == 2 ? 'Jarayonda' : active > 2 ? 'Bajarildi' : '3-qadam'" />
    </el-steps>

    <div v-if="active == 0" class="form__group">
      <el-form-item label="Ism">
        <el-input 
          v-model="user.firstName"
          size="large"
        />
      </el-form-item>

      <el-form-item label="Familiya">
        <el-input 
          v-model="user.lastName"
          size="large"
        />
      </el-form-item>
    </div>
    

    <div v-if="active == 1" class="form__group">
      <el-form-item label="Sizning jinsingiz nima?">
        <el-radio-group v-model="user.gender">
          <el-radio value="Sponsor">Ayol</el-radio>
          <el-radio value="Venue">Erkak</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="Tug'ilgan vaqtingiz?">
        <el-date-picker
          v-model="user.birth"
          placeholder="Sanani tanlang"
          size="large"
        />
      </el-form-item>
    </div>

    <div v-if="active > 1" class="form__group">
      <el-form-item label="Email">
        <el-input 
          v-model="user.email"
          size="large"
        />
      </el-form-item>

      <el-row :gutter="12">
        <el-col :span="12">
          <el-form-item label="Parol">
            <el-input 
              v-model="user.password"
              type="password"
              show-password
              size="large"
            />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="Parolni tasdiqlang">
            <el-input 
              v-model="user.confPassword"
              type="password"
              show-password
              size="large"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </div>

    <!-- <el-form-item>
      <el-checkbox
        v-model="user.remember"
        label="Parolni ko'rsatish"
      />
    </el-form-item> -->
    <el-form-item>
      <!-- <el-text class="policy">
        Davom etish orqali
        <router-link to="/terms">Foydalanish shartlari</router-link>
        va
        <router-link to="/policy">Maxfiylik siyosatiga</router-link>
        rozilik bildirasiz
      </el-text> -->
      <el-button size="large" type="primary" plain @click="next" round>{{ active > 2 ? 'Yakunlash' : 'Keyingi' }}</el-button>
    </el-form-item>
    <div class="form__links">
      <el-text>
        Hisobingiz bormi?
        <router-link to="/auth/signin">Tizimga kiring</router-link>
      </el-text>
    </div>
  </el-form>
</template>

<script setup>
import { ref } from 'vue';

const user = ref({
  email: "",
  password: "",
  remember: false,
});

const active = ref(0)

const next = () => {
  if (active.value++ > 2) active.value = 0
}

</script>

<style lang="css" scoped>

.el-form {
  width: 380px;
  min-width: 220px;
}
.el-text.title {
  font-size: 24px;
  display: inline-block;
  margin-bottom: 24px;
  font-weight: 500;
  color: #333333;
}

.el-steps {
  margin-bottom: 24px;
}
/* .el-text.policy {
  font-size: 13px;
  line-height: 18px;
  text-align: center;
} */
.el-form-item {
  margin-bottom: 16px;
}
.form__links {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form__links a {
  color: #333333;
}
.form__links .el-text {
  margin-bottom: 10px;
}
.el-button {
  font-weight: 500;
  display: inline-block;
  width: 100%;
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>