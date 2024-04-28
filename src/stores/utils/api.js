import axios from "axios";
import { defineStore, storeToRefs } from "pinia";
import { url } from "./env";
import { tokenStore } from "../auth/token";

export const apiStore = defineStore("apiStore", () => {

  const token_store = tokenStore();
  const { token } = storeToRefs(token_store);

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