import axios from "axios";
import { defineStore, storeToRefs } from "pinia";
import { url } from "./env";
import { tokenStore } from "../auth/token";
import { ElMessage } from "element-plus";
import { loadingStore } from "./loading";

export const apiStore = defineStore("apiStore", () => {

  const token_store = tokenStore();
  const { token } = storeToRefs(token_store);

  const loading_store = loadingStore();

  // GET
  const get = async (payload) => {
    return await axios.get(`${url}/${payload.url}`, {
      headers: {
        "Authorization": `Bearer ${token.value}`
      },
      params: payload.params
    }).catch(e => {
      console.log(e);
    })
  }

  // POST
  const post = async (payload) => {
    console.log(payload);
    return await axios.post(`${url}/${payload.url}`, payload.data, {
      headers: {
        "Authorization": `Bearer ${token?.value}`
      }
    }).catch(e => {
      console.log(e);
      if (e.response.status == 400 && e.response.data == "Incorrect password") {
        ElMessage({
          type: "error",
          message: "Parolda xatolik bor"
        })
        loading_store.setLoading(false);
      }
      if (e.response.status == 400 && e.response.data == "Cannot find user") {
        ElMessage({
          type: "error",
          message: "Bunday foydalanuvchi mavjud emas"
        })
        loading_store.setLoading(false);
      }
    })
  }

  // PUT
  const put = async (payload) => {
    return await axios.put(`${url}/${payload.url}`, payload.data, {
      headers: {
        "authorization": `Bearer ${token?.value}`
      }
    }).catch(e => {
      console.log(e);
    })
  }

  // DELETE
  const del = async (payload) => {
    return await axios.delete(`${url}/${payload.url}`, {
      headers: {
        "Authorization": `Bearer ${token?.value}`
      }
    }).catch(e => {
      console.log(e);
    })
  }

  return {
    get,
    post,
    put,
    del
  }

})