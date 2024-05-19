import axios from "axios";
import { FormDetailTypes } from "@/helpers/interface";
const BackendUrl = process.env.BACKEND_URL || "http://localhost:4000"
export const loginUser = (payload: FormDetailTypes, register: Boolean) => {
  return new Promise<void>((resolve, reject) => {
    axios({
      url: register ? `${BackendUrl}/authenticate/register` : `${BackendUrl}/authenticate/login`,
      method: 'post',
      data: payload, 
      withCredentials: true
    }).then((result: any) => {
      resolve(result)
    }).catch(err => {
      reject(err)
    });
  })
}

export const logoutUser = () => {
  return new Promise<void>((resolve, reject) => {
    axios({
      url:  `${BackendUrl}/authenticate/logout`,
      method: 'post',
      withCredentials: true
    }).then((result: any) => {
      resolve(result)
    }).catch(err => {
      reject(err)
    });
  })
}
