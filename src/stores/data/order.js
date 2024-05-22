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

    if (res.data == 201) {
      console.log(res.data);
    }
  }



  return {
    orders,
    order,

    addOrder
  }

})