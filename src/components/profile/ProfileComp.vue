<template>
  <el-card v-loading="loading">
    <template #header>
      <div class="card-header">
        <el-image style="width: 100px; height: 100px" :src="user.avatar?.response?.data" fit="cover">
          <template #error>
            <div class="image-slot">
              {{ user.name?.first.slice(0, 1) }}
            </div>
          </template>
        </el-image>
        <el-button :icon="Delete" type="danger" />
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
        <el-text class="label" tag="b">Ism:</el-text>
        <el-text>{{ user.name?.first }}</el-text>
      </el-col>
      <el-col>
        <el-text class="label" tag="b">Familiya:</el-text>
        <el-text>{{ user.name?.last }}</el-text>
      </el-col>
      <el-col>
        <el-text class="label" tag="b">Email:</el-text>
        <el-text>{{ user.email }}</el-text>
      </el-col>
      <el-col>
        <el-text class="label" tag="b">Lavozim:</el-text>
        <el-text>{{ user.role == "@super_admin" ? "Super admin" : user.role == 1 ? "Operator" : "Admin" }}</el-text>
      </el-col>
      <el-col>
        <el-text class="label" tag="b">Holati:</el-text>
        <el-text :type="user.status ? 'success' : 'danger'">{{ user.status ? "Faol" : "Nofaol" }}</el-text>
      </el-col>
      <el-button @click="dialog_store.setEditToggle(true), id = user.id" :icon="Edit" type="primary" plain/>
    </el-row>
    <template #footer>
      <el-row>
        <el-col>
          <el-text class="label" tag="b">Buyurtmalar soni:</el-text>
          <el-text>0 ta</el-text>
        </el-col>
        <el-col>
          <el-text class="label" tag="b">Daromad:</el-text>
          <el-text>0 so'm</el-text>
        </el-col>
      </el-row>
    </template>
  </el-card>
  <WorkerDialog :id="id" />
</template>

<script setup>
import { userStore } from '@/stores/data/user';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import cookies from 'vue-cookies'

import { Edit, Delete } from '@element-plus/icons-vue';
import WorkerDialog from '@/components/workers/WorkerDialog.vue';

import { dialogStore } from "@/stores/utils/dialog";
import { loadingStore } from '@/stores/utils/loading';

const route = useRoute()
const loading_store = loadingStore()
const { loading } = storeToRefs(loading_store)
const dialog_store = dialogStore();

const user_store = userStore();
const { user } = storeToRefs(user_store);

// watch(user, (newValue, oldValue) => {
//   console.log(newValue);
//   console.log(oldValue);
// })

onMounted(() => {
  user_store.getUser(route.params.id || cookies.get("user-id"))
})

const id = ref("")

</script>

<style lang="css" scoped>
@import url("@/styles/components/profile/profile.css");
.el-button {
  width: 34px;
  height: 32px;
}
</style>