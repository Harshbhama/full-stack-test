import axios from "axios";
export const uploadImage = (payload: any) => {
  return new Promise<any>((resolve, reject) => {
    axios({
      url: 'http://localhost:4000/upload/uploadImage',
      method: 'post',
      data: payload.formData, 
      // withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        // inputData: JSON.stringify(payload.inputProps)
      },
    }).then((result: any) => {
      resolve(result)
    }).catch(err => {
      reject(err)
    });
  })
}