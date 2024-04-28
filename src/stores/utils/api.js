import axios from "axios";
import { defineStore, storeToRefs } from "pinia";
import { url } from "./env";
import { authStore } from "../auth/auth"

export const apiStore = defineStore("apiStore", () => {

  const auth_store = authStore();
  const { token } = storeToRefs(auth_store);

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
    return await axios.post(`${url}/${payload.url}`, payload.data, {
      headers: {
        "Authorization": `Bearer ${token.value}`
      }
    }).catch(e => {
      console.log(e);
    })
  }

  // PUT
  const put = async (payload) => {
    return await axios.put(`${url}/${payload.url}`, payload.data, {
      headers: {
        "Authorization": `Bearer ${token.value}`
      }
    }).catch(e => {
      console.log(e);
    })
  }

  // DELETE
  const del = async (payload) => {
    return await axios.delete(`${url}/${payload.url}`, {
      headers: {
        "Authorization": `Bearer ${token.value}`
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