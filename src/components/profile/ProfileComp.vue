<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <el-image style="width: 100px; height: 100px" :src="user.avatar?.response?.data" fit="cover">
          <template #error>
            <div class="image-slot">
              {{ user.name?.first.slice(0, 1) }}
            </div>
          </template>
        </el-image>
        <el-button @click="dialog_store.setEditToggle(true), id = user.id" :icon="Edit" type="primary" plain/>
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
        <el-text>{{ user.role == 0 ? "Admin" : user.role == 1 ? "Operator" : "Super admin" }}</el-text>
      </el-col>
      <el-col>
        <el-text class="label" tag="b">Holati:</el-text>
        <el-text :type="user.status ? 'success' : 'danger'">{{ user.status ? "Faol" : "Nofaol" }}</el-text>
      </el-col>
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
import cookies from "vue-cookies";
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { Edit } from '@element-plus/icons-vue';
import WorkerDialog from '@/components/workers/WorkerDialog.vue';

import { dialogStore } from "@/stores/utils/dialog";

const dialog_store = dialogStore();

const user_store = userStore();
const { user } = storeToRefs(user_store);

watch(user, (newValue, oldValue) => {
  console.log(newValue, oldValue);
})

const userId = ref(cookies.get("user-id"));

onMounted(() => {
  user_store.getUser(userId.value)
})

const id = ref("")

</script>

<style lang="css" scoped>
@import url("@/styles/components/profile/profile.css");
</style>