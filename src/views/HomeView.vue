<template>
  <section>
    <el-row :gutter="12">
      <el-col :lg="6" :span="12">
        <el-card>
          <el-statistic :value="46">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                Kundalik buyurtmalar
                <el-tooltip
                  effect="dark"
                  content="Bir kun ichidagi buyurtmalar soni"
                  placement="top"
                >
                  <el-icon style="margin-left: 4px" :size="12">
                    <Warning />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>kechagiga nisbatan o'sish</span>
              <span class="green">
                24%
                <el-icon>
                  <CaretTop />
                </el-icon>
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="6" :span="12">
        <el-card>
          <el-statistic :value="outputValue">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                Oylik buyurtmalar
                <el-tooltip
                  effect="dark"
                  content="Bir oy ichidagi buyurtmalar soni"
                  placement="top"
                >
                  <el-icon style="margin-left: 4px" :size="12">
                    <Warning />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>o'tgan oyga nisbatan o'sish</span>
              <span class="red">
                12%
                <el-icon>
                  <CaretBottom />
                </el-icon>
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="6" :span="12">
        <el-card>
          <el-statistic :value="821000" title="">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                Bugungi tranzaksiyalar
                <el-tooltip
                  effect="dark"
                  content="Bir kun ichidagi tranzaksiyalar"
                  placement="top"
                >
                  <el-icon style="margin-left: 4px" :size="12">
                    <Warning />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>kechagiga nisbatan o'sish</span>
              <span class="green">
                16%
                <el-icon>
                  <CaretTop />
                </el-icon>
              </span>
            </div>
            <div class="footer-item">
              <el-icon :size="14">
                <ArrowRight />
              </el-icon>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="6" :span="12">
        <el-card>
          <el-statistic :value="28213000" title="New transactions today">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                Oylik tranzaksiyalar
                <el-tooltip
                  effect="dark"
                  content="Bir oy ichidagi tranzaksiyalar"
                  placement="top"
                >
                  <el-icon style="margin-left: 4px" :size="12">
                    <Warning />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>o'tgan oyga nisbatan o'sish</span>
              <span class="green">
                16%
                <el-icon>
                  <CaretTop />
                </el-icon>
              </span>
            </div>
            <div class="footer-item">
              <el-icon :size="14">
                <ArrowRight />
              </el-icon>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useTransition } from '@vueuse/core';

const source = ref(0);
const outputValue = useTransition(source, {
  duration: 1000,
});
source.value = 2651;

</script>

<style lang="css" scoped>
section {
  padding: 10px;
}
.el-col {
  margin-bottom: 10px;
}
.el-card {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.06);
  border: none;
}
.auth__block {
  display: flex;
  gap: 10px;
}
h1 {
  margin-bottom: 50px;
}
.el-card {
  height: 100%;
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}
</style>