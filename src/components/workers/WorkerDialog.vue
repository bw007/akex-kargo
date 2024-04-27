<template>
  <el-dialog
    v-model="toggle"
    title="Yangi xodim"
    width="740"
    class="modal"
    :before-close="handleClose"
  >
    <template #default>
      <FormComp />
    </template>
  </el-dialog>
</template>

<script setup>
import { dialogStore } from '@/stores/utils/dialog';
import { storeToRefs } from 'pinia';
import FormComp from '@/components/workers/FormComp.vue';

const dialog = dialogStore();
const { toggle } = storeToRefs(dialog);

const handleClose = () => {
  dialog.setToggle(false);
}
</script>

<style lang="css">
@media only screen and (max-width: 767px) {
  .modal {
    width: 80%;
    min-width: 280px;
  }
}
</style>