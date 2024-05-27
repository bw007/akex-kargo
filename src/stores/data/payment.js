import { defineStore } from "pinia";
import { apiStore } from "../utils/api";
import { loadingStore } from "../utils/loading";
import { ref } from "vue";

export const paymentStore = defineStore("paymentStore", () => {
  const api = apiStore()
  const loading_store = loadingStore()

  const payments = ref([]);
  const payment = ref({});

  // Add payment
  const addPayment = async (data) => {
    console.log(data);
    let res = await api.post({ url: "payments", data })

    if (res.status == 201) {
      payments.value = [ { ...res.data }, ...payments.value ]
    }
  }

  // Get all payments
  const getAllpayments = async (userId) => {
    loading_store.setLoading(true)
    let res = await api.get({ url: `payments?_sort=id&_order=desc&userId=${userId}` })
    
    if (res.status == 200) {
      payments.value = [ ...res.data ]
    }
    loading_store.setLoading(false)
  }

  return {
    payments,
    payment,

    addPayment,
    getAllpayments
  }
})