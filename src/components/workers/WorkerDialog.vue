<template>
  <el-dialog
    v-model="toggle"
    title="Yangi xodim"
    width="500"
    :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialog.setToggle(false)">Cancel</el-button>
        <el-button type="primary" @click="dialog.setToggle(false)">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { dialogStore } from '@/stores/utils/dialog';
import { storeToRefs } from 'pinia';

const dialog = dialogStore();
const { toggle } = storeToRefs(dialog);

const handleClose = () => {
  dialog.setToggle(false);
}
</script>

<style lang="css" scoped>
  
</style>