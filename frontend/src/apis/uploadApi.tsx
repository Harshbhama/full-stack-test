import axios, { AxiosResponse } from "axios";
const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000"
export const uploadImage = (payload: any, inputProps: any) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    axios({
      url: `${BackendUrl}/upload/uploadImage`,
      method: 'post',
      data: payload.formData, 
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        inputData: JSON.stringify(inputProps)
      },
    }).then((result: AxiosResponse<any>) => {
      resolve(result)
    }).catch(err => {
      reject(err)
    });
  })
}
export const fetchFiles = () => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    axios({
      url: `${BackendUrl}/upload/images`,
      method: 'get',
      withCredentials: true,
    }).then((result: AxiosResponse<any>) => {
      console.log("result", result);
      resolve(result)
    }).catch(err => {
      reject(err)
    });
  })
}
