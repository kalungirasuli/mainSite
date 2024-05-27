import { Link } from "react-router-dom"
import { IoIosSearch } from "react-icons/io"
import { FaRegFileImage, FaTrash } from "react-icons/fa";
import { useState } from "react";
export function Alt(props){
    return(
        <>
         <Link to={props.link} onClick={props.onclick} className="m-auto p-0 text-center w-[200px] ">
            <p className="flex flex-row gap-[5px] justify-center text-center p-3 w-[200px] m-auto">
                <span className="text-blue text-center text-[15px]">{props.highlightText}</span>
                <span className="text-greytestdark text -center text-[15px]">{props.endText}</span>
            </p>
         </Link>
        </>
    )
}
export const styles=' lg:bg-white lg:shadow-xl lg:rounded-[20px] lg:p-[50px] lg:w-[max-content] lg:m-auto lg:mt-[20%] xl:mt-5'
export const buttonStyle='w-[300px] m-auto pt-[20px] md:w-[450px]'
export function Input(props) {
    return (
        <div className="div flex flex-col gap-2 w-[300px] m-auto pt-[20px] md:w-[450px]">
            <label htmlFor={props.for} className="text-[15px] text-greytextdark text-left pl-3">{props.label}</label>
            <input 
                type={props.type} 
                placeholder={props.placeholder} 
                id={props.ids} 
                value={props.value} 
                name={props.name} 
                className={`${props.classes} rounded-[10px] p-3 shadow-md w-[100%] text-center`} 
                onChange={props.onChange}
            />
        </div>
    );
}

export function File(props) {
    return (
        <div className="flex flex-col gap-2 w-[300px] m-auto pt-[20px] md:w-[450px]">
            <label htmlFor={props.for} className="text-[15px] text-greytextdark text-left pl-3">
                {props.label}
            </label>
            <input
                type={props.type}
                id={props.ids}
                name={props.name}
                className={`${props.classes} rounded-[10px] p-3 shadow-md w-[100%]`}
                onChange={props.onChange}
            />
        </div>
    );
}

export function Search(props) {
    return(
        <>
        <div className="flex flex-row w-[80%] m-auto  bg-white shadow-lg shadow-smoke rounded-[10px] ">
        <button className=" rounded-[10px] p-2 text-white  w-[30px]"><IoIosSearch className="fill-greytextdark " style={{fontSize:'25px'}}/></button>
            <input 
                type={props.type} 
                placeholder={props.placeholder} 
                id={props.ids} 
                value={props.value} 
                name={props.name} 
                className={`${props.classes} rounded-[10px] p-3  w-full border-0 text-left text-[15px] `} 
                onChange={props.onChange}
            />
            
        </div>
        </>
    )
}

// textarea
export function TextArea(props) {
  return (
    <div className="flex flex-col gap-2 w-[90%] m-auto pt-[20px]">
      <label htmlFor={props.for} className="text-[15px] text-greytextdark text-left pl-3">
        {props.label}
      </label>
      <textarea
        type={props.type}
        placeholder={props.placeholder}
        id={props.ids}
        name={props.name}
        className={`${props.classes} rounded-[10px] p-3 shadow-md w-[100%] h-[250px]`}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}



// file picker
export function FilePicker({ onFileChange }) {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    // Check file type (image or video)
    const fileType = selectedFile.type.split("/")[0];
    if (fileType !== "image" && fileType !== "video") {
      alert("Please select an image or video file.");
      return;
    }

    setFileName(selectedFile.name);
    onFileChange(selectedFile);
  };

  return (
    <div className="flex flex-col gap-2 w-[90%] m-auto pt-[20px]">
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="hidden"
        id="filePicker"
      />
      <label
        htmlFor="filePicker"
        className="bg-gray-200 p-2 rounded-[10px] cursor-pointer"
      >
        {fileName || "Choose a file"}
      </label>
    </div>
  );
}