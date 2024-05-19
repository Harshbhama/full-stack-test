'use client'
import Image from "next/image";
import { FileUpload } from "@/components/FileUpload";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/apis/uploadApi";
export default function Home() {
  const [file, setFile] = useState<any>("");
  const onSubmit = () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    if(!file){
      alert("PLease upload file")
    }
    let data = {
      formData: formData
    }
    uploadImage(data).then(res => {
      console.log(res);
    })
    // store.dispatch(uploadStoryThunk(data)).then(res => {
    //   if(res.payload.data.error === false){
    //   if(res?.payload?.data?.error === false){
    //       alert("File uploaded successfully");
    //   }else{
    //     alert("Some error while uploading")
    //   }
    // })
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <FileUpload fileProps={{name: "Upload Snap !", className: "w-2/4"}} setFile={setFile}/>
    <Button onClick={onSubmit}> Submit</Button>
    </main>
  );
}
