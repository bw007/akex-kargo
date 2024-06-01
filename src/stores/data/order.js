import { defineStore } from "pinia";
import { apiStore } from "../utils/api";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { loadingStore } from "../utils/loading";
import { paymentStore } from "./payment";

export const orderStore = defineStore("orderStore", () => {
  const api = apiStore();
  const loading_store = loadingStore()
  const payment_store = paymentStore()
  
  const orders = ref([]);
  const orders_count = ref(0)
  const money = ref(0)
  const order = ref({});

  // Add order
  const addOrder = async (data) => {
    let res = await api.post({ url: "orders", data })
    if (res.status == 201) {
      ElMessage({
        type: 'success',
        message: "Muvaffaqiyatli qo'shildi"
      })
      if (res.data.payment) {
        payment_store.addPayment({
          order: res.data.name,
          price: res.data.price,
          money: res.data.payment,
          client: res.data.firstName + ' ' + res.data.lastName,
          createdTime: new Date(),
          id: String(Date.now()),
          userId: res.data.userId,
          orderId: res.data.id
        })
      }
      orders.value = [ { ...res.data }, ...orders.value ]
    }
  }

  // All orders
  const getAllOrders = async (userId) => {
    loading_store.setLoading(true)
    let res = await api.get({ url: `orders?_sort=id&_order=desc&userId=${userId}` })
    orders.value = []
    if (res.status == 200) {
      orders.value = [ ...res.data ]
      orders_count.value = [ ...res.data ].length
      money.value = res.data.reduce((acc, item) => acc + item.payment, 0)
    }
    loading_store.setLoading(false)
  }

  // Update order
  const updateOrder = async (payload) => {
    let res = await api.put({ 
      url: `orders/${payload.id}`,
      data: { ...payload } 
    })

    if (res.status == 200) {
      orders.value = [ ...orders.value.map((order) => {
          if (order.id == payload.id) return { ...res.data }
          return order
        })
      ]
      ElMessage({
        type: 'success',
        message: "Muvaffaqiyatli saqlandi"
      })
    } 
  }

  // Get order
  const getOrder = async (id) => {
    loading_store.setLoading(true)
    let res = await api.get({ url: `orders/${id}` })

    if (res.status == 200) {
      order.value = { ...res.data }
    }
    loading_store.setLoading(false)
  }

  return {
    orders,
    order,
    orders_count,
    money,

    addOrder,
    getAllOrders,
    updateOrder,
    getOrder
  }
})