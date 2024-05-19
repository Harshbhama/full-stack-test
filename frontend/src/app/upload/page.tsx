"use client";
import { useEffect, useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/apis/uploadApi";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import DragDrop from "@/components/FileDrag";
import DatePicker from "@/components/DatePicker";
import TimePickerComponent from "@/components/TimePicker";
const Page = () => {
  console.log("here");
  const [file, setFile] = useState<any>("");
  const [dateFormat, setDateInFormat] = useState<string>('');
  const [timeFormat, setTimeFormat] = useState<string>('');
  const onSubmit = () => {
    onImageUpload();
  };
  const router = useRouter();
  // useEffect(() => {
  //   if(file){
  //     onSubmit()
  //   }
  // },[file])
  const { mutate: onImageUpload } = useMutation({
    // Using React Query approach
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);
      if (!file) {
        alert("PLease upload file");
        return;
      }
      let inputProps = {
        dateFormat, timeFormat
      }
      let data = {
        formData: formData,
      };
      const response = await uploadImage(data, inputProps);
      return response;
    },
    onError: (error: any | null, variables, context) => {
      console.log(error);
      alert(error?.response?.data?.msg);
      alert("Please login again, token expired!")
      router.push('/')
    },
    onSuccess: (data: any, variables, context) => {
      console.log(data);
      router.push("/files");
    },
  });
  return (
    <>
      <div className=" shadow-sm border-[#E4E4E7] border-solid border-[1px] rounded-lg md:min-w-[407px] flex items-center justify-center">
        <div className="p-[24px]">
          <h3 className="pb-[10px] text-[24px] leading-[32px] tracking-[-2.5%] text-[#09090B] font-semibold">Upload Your Files</h3>
          <p className="text-[#71717A] font-normal leading-[20px] text-[14px] mb-[40px]">Upload File and then Choose Date & Time to Publish</p>
          <DragDrop setFile={setFile}/>
          <div className="mt-[20px]">
            <p className="mb-[5px]">Publish date</p>
            <DatePicker setDateInFormat={setDateInFormat}/>
          </div>
          <div className="mt-[20px]">
            <p className="mb-[5px]">Publish date</p>
            <TimePickerComponent setTimeFormat={setTimeFormat}/>
          </div>
          <div>
            <Button className="flex justify-center items-center w-full mt-[20px]" onClick={() => onSubmit()}>Save</Button>
          </div>
        </div>
      </div>
    </>
  
  );
};
export default Page;
