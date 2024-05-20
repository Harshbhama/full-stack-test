import React, { useRef } from "react";
import { Button } from "@/components/ui/button"
import { onUploadSnap } from "@/helpers/utils";
interface Story {
  fileProps: {  
    name: String,
    className: string
  }
  setFile: React.Dispatch<React.SetStateAction<File | null>>
}

export const FileUpload: React.FC<Story> = ({fileProps, setFile}) => {
  const ref = useRef<HTMLInputElement>(null);
  const handleChange = (event: any) => {
    console.log(event.target.files[0])
    setFile(event.target.files[0])
  }
  return (
    <>
      <Button onClick={() => onUploadSnap(ref)} className={fileProps?.className}> Upload SNAP !</Button>
      <input ref={ref} type="file" className="hidden" onChange={handleChange} />
    </>
  )
}