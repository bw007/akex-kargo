import axios from "axios";
import { defineStore, storeToRefs } from "pinia";
import { url } from "./env";
import { tokenStore } from "../auth/token";
import { ElMessage } from "element-plus";
import { loadingStore } from "./loading";
import cookies from "vue-cookies";
import router from "@/router";

export const apiStore = defineStore("apiStore", () => {

  const token_store = tokenStore();
  const { token } = storeToRefs(token_store);

  const loading_store = loadingStore();

  // GET
  const get = async (payload) => {
    return await axios.get(`${url}/${payload.url}`, {
      headers: {
        "Authorization": `Bearer ${token?.value}`
      },
      params: payload.params
    }).catch(e => {
      if (e.response.status == 401 && e.response.statusText == "Unauthorized") {
        ElMessage({
          type: "error",
          message: "Tizimga kirish ruxsati yo'q"
        })

        cookies.remove("token");
        cookies.remove("user");
        setTimeout(() => {
          router.push({ name: "SignIn" })
        }, 1000);
      }
      return e
    })
  }

  // POST
  const post = async (payload) => {
    return await axios.post(`${url}/${payload.url}`, payload.data, {
      headers: {
        "Authorization": `Bearer ${token?.value}`
      }
    }).catch(e => {
      console.log(e);
      if (e.message == "Network Error") {
        ElMessage({
          type: "error",
          message: "Xatolik. Ulanishni tekshiring"
        })
        loading_store.setLoading(false);
      }

      if (e.response.status == 400 && e.response.data == "Incorrect password") {
        ElMessage({
          type: "error",
          message: "Parolda xatolik bor"
        })
        loading_store.setLoading(false);
      }

      if (e.response.status == 400 && e.response.data == "Email already exists") {
        ElMessage({
          type: "error",
          message: "Bunday email ro'yxatdan o'tgan"
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

      if (e.response.status == 401 && e.response.statusText == "Unauthorized") {
        ElMessage({
          type: "error",
          message: "Tizimga kirish ruxsati yo'q"
        })

        cookies.remove("token");
        cookies.remove("user");
        setTimeout(() => {
          router.push({ name: "SignIn" })
        }, 1000);
      }
      console.log(e);
      if (e.message == "Network Error") {
        ElMessage({
          type: "error",
          message: "Xatolik. Ulanishni tekshiring"
        })
      }

    })
  }

  return {
    get,
    post,
    put,
    del
  }

})