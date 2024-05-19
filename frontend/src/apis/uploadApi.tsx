import axios from "axios";
const BackendUrl = process.env.BACKEND_URL || "http://localhost:4000"
export const uploadImage = (payload: any, inputProps: any) => {
  return new Promise<any>((resolve, reject) => {
    axios({
      url: 'http://localhost:4000/upload/uploadImage',
      method: 'post',
      data: payload.formData, 
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        inputData: JSON.stringify(inputProps)
      },
    }).then((result: any) => {
      resolve(result)
    }).catch(err => {
      reject(err)
    });
  })
}
export const fetchFiles = () => {
  return new Promise<any>((resolve, reject) => {
    axios({
      url: `${BackendUrl}/upload/images`,
      method: 'get',
      withCredentials: true,
    }).then((result: any) => {
      console.log("result", result);
      resolve(result)
    }).catch(err => {
      reject(err)
    });
  })
}
