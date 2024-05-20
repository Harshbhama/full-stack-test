import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

interface DragDropProps {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const fileTypes = ["JPG", "PNG", "JPEG"];

const DragDrop: React.FC<DragDropProps> = ({setFile}) => {
  const handleChange = (file: File) => {
    setFile(file)
    alert("File uploaded, please click on Save button to upload to server !")
    // setFile(event.target.files[0])
  };
  const css = `
  .guZdik {
      min-height: 120px;
      border: dashed 1px #E4E4E7;
  }
  .guZdik svg {
    display: none;
  }
  `;
  return (
    <>
      <style>{css}</style>
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
    </>
  );
}

export default DragDrop;
