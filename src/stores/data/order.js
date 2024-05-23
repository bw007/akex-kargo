import { defineStore, storeToRefs } from "pinia";
import { apiStore } from "../utils/api";
import { ref, watch } from "vue";
import { ElMessage } from "element-plus";
import { authStore } from "../auth/auth";

export const orderStore = defineStore("orderStore", () => {
  const api = apiStore();
  const auth_store = authStore()

  const { user } = storeToRefs(auth_store)

  const orders = ref([]);
  const order = ref({});

  // Add order
  const addOrder = async (data) => {
    console.log(data);
    let res = await api.post({ url: "orders", data })
    if (res.status == 201) {
      ElMessage({
        type: 'success',
        message: "Muvaffaqiyatli qo'shildi"
      })
      console.log(res.data);
      orders.value = [ ...orders.value, { ...res.data } ]
      console.log(orders.value);
    }
  }

  // All orders
  const getAllOrders = async (userId) => {
    let res = await api.get({ url: `orders?userId=${userId}` })
    
    if (res.status == 200) {
      orders.value = [ ...res.data ]
    }
  }

  return {
    orders,
    order,

    addOrder,
    getAllOrders
  }

})