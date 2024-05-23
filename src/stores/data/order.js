import { defineStore } from "pinia";
import { apiStore } from "../utils/api";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { loadingStore } from "../utils/loading";

export const orderStore = defineStore("orderStore", () => {
  const api = apiStore();
  const loading_store = loadingStore()
  
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
    loading_store.setLoading(true)
    let res = await api.get({ url: `orders?userId=${userId}` })
    orders.value = []
    if (res.status == 200) {
      orders.value = [ ...res.data ]
    }
    loading_store.setLoading(false)
  }

  return {
    orders,
    order,

    addOrder,
    getAllOrders
  }

})