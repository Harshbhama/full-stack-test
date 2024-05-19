import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "JPEG"];

const DragDrop: React.FC<any> = ({setFile}) => {
  const handleChange = (file: any) => {
    setFile(file)
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
