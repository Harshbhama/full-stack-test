/*
 * This Is Demo reactjs-timepicker
 */
// import React form 'react'
// import ReactDOM form 'react-dom'
import { useEffect, useState } from "react";
import TimePicker from "reactjs-timepicker";

const TimePickerComponent: React.FC<any> = ({setTimeFormat}) => {
  const now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  const time =
    (hours < 10 ? "0" + hours : hours) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes);
  const [timeN, setTime] = useState<string>(time)
  useEffect(() => {
    setTimeFormat(timeN);
  },[timeN])
  const css = `
  .jTime-clockInput{
    color: black;
    margin-left: 20px;
    padding-top: 10px !important;
    padding-bottom: 10px !important;
  }
  .jTime-box{
    background: #808797 !important;
  }
  .jTime-clockIcon{
    background: #808797 !important;
  }
  `;
    return (
      <div>
        <style>{css}</style>
        <TimePicker
          defaultTime={timeN}
          inputVisible={true}
          // @ts-ignore
          onChange={setTime}
        />
      </div>
    );
  
}
export default TimePickerComponent;