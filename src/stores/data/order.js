import { defineStore } from "pinia";
import { apiStore } from "../utils/api";
import { ref } from "vue";

export const orderStore = defineStore("orderStore", () => {
  const api = apiStore();

  const orders = ref([]);
  const order = ref({});

  // Add order
  const addOrder = async (data) => {
    let res = await api.post({ url: "orders", data })

    if (res.status == 201) {
      console.log(res.data);
      orders.value = [ ...orders.value, ...res.data ]
      console.log(orders.value);
    }
  }

  // All orders
  const getAllOrders = async () => {
    let res = await api.get({ url: "orders" })

    if (res.status == 200) {
      console.log(res.data);
    }
  }

  return {
    orders,
    order,

    addOrder,
    getAllOrders
  }

})