<template>
  <el-table :data="filterUserData" style="width: 100%; height: calc(100vh - 200px);">
    <el-table-column fixed type="index" align="center" />
    <el-table-column label="Ism, Familiya" min-width="180" prop="firstName">
      <template #default="list">
        <el-text tag="b">{{ list.row.firstName }} {{ list.row.lastName }}</el-text>
      </template>
    </el-table-column>
    <el-table-column label="Email" min-width="220" prop="email">
      <template #default="list">
        <el-text>{{ list.row.email }}</el-text>
      </template>
    </el-table-column>
    <el-table-column label="Qo'shilgan sana" min-width="145" prop="createdTime">
      <template #default="list">
        <el-text>{{ list.row.createdTime }}</el-text>
      </template>
    </el-table-column>
    <el-table-column label="Holati" min-width="72" prop="status">
      <template #default="list">
        <el-button @click="user_store.changeStatus(list.row)" :disabled="['@super_admin'].includes(list.row.role)" :type="list.row.status ? 'success' : 'warning'">
          <el-icon :size="16">
            <LockOpenIcon v-if="list.row.status" />
            <LockClosedIcon v-else />
          </el-icon>
        </el-button>
      </template>
    </el-table-column>
    <el-table-column label="Lavozim" min-width="125" prop="role">
      <template #default="list">
        <el-text type="success" v-if="list.row.role == '@super_admin'">Super admin</el-text>
        <el-text v-else-if="list.row.role == 1">Operator</el-text>
        <el-text v-else>Admin</el-text>
      </template>
    </el-table-column>
    <el-table-column align="right" min-width="195">
      <template #header>
        <el-input v-model="search" placeholder="Qidirish..." />
      </template>
      <template #default="list">
        <router-link class="profil-link" :to="{ name: 'workersProfile', params: { id: list.row.id } }">
          <el-text type="primary">
            Profil
            <el-icon size="12">
              <top-right />
            </el-icon>
          </el-text>
        </router-link>
        <el-button @click="edit(list.row.id)" title="Tahrirlash" :icon="Edit" type="primary" plain />
        <el-button @click="user_store.removeUser(list.row.id)" :disabled="['@super_admin'].includes(list.row.role)" title="O'chirish" :icon="Delete" type="danger" plain />
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
const emit = defineEmits(["edit"]);
import { computed, ref } from 'vue';
import { Delete, Edit } from '@element-plus/icons-vue';
import { LockClosedIcon, LockOpenIcon } from "@heroicons/vue/24/outline";
import { userStore } from '@/stores/data/user';
import { storeToRefs } from 'pinia';
import { convertDate } from '@/stores/utils/helper';
import { dialogStore } from '@/stores/utils/dialog';

const user_store = userStore();
const { users } = storeToRefs(user_store);

const dialog_store = dialogStore()

const search = ref('')

const filterUserData = computed(() =>
  usersData.value.filter((data) =>
    !search.value ||
    (data.firstName + data.lastName).toLowerCase().includes(search.value.toLowerCase())
  )
)

const usersData = computed(() => {
  return users.value.map(user => {
    return {
      ...user,
      createdTime: convertDate(user.createdTime)
    }
  })
})

const edit = (id) => {
  emit("edit", id)
  dialog_store.setEditToggle(true)
}

</script>

<style lang="css" scoped>
@import url("@/styles/components/workers/workers-table.css");
</style>