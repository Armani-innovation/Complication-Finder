import {jwtDecode} from "jwt-decode";
import axios from "@/axios/axios.js";
import {ref} from "vue";

export const sessionToken = ref(sessionStorage.getItem('token') || null)

export async function getInfo(username, password) {

  const res = await axios.post("token/", {username, password});
  const token = res.data.access;
  sessionToken.value = token
  sessionStorage.setItem("token", token);

  const decoded = jwtDecode(token)
  const user = await axios.get("register/", {params: {id: decoded.user_id}})
  return user.data;

}

export async function getTokenInfo(token) {

  if (token) {
    const decoded = jwtDecode(token)
    const user = await axios.get("register/", {params: {id: decoded.user_id}})
    return user.data;
  }

}
