import { Link } from "react-router-dom"
import { IoIosSearch } from "react-icons/io"
import { FaRegFileImage, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { CgFormatSlash } from "react-icons/cg";
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


export function FilePicker({ onFileChange }) {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    // Check file type (image or video)
    const fileType = selectedFile.type.split('/')[0];
    if (fileType !== 'image' && fileType !== 'video') {
      alert('Please select an image or video file.');
      return;
    }

    // Add file to the list
    const updatedFiles = [...files, selectedFile];
    setFiles(updatedFiles);
    onFileChange(updatedFiles);
  };

  const handleRemoveFile = (event, index) => {
    event.preventDefault();
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFileChange(updatedFiles);
  };

  return (
    <div className="p-4">
      <label htmlFor="fileInput" className="cursor-pointer w-[80%] m-auto flex items-center space-x-2 p-2 border-2 border-dashed border-gray-400 rounded-md hover:border-gray-600">
        <FaRegFileImage className="text-2xl" />
        <span>{files.length === 0 ? 'Select File' : 'Add Another File'}</span>
        <input
          type="file"
          id="fileInput"
          accept="image/*, video/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      <div className="mt-4 flex flex-wrap md:flex-nowrap overflow-x-auto p-4">
        {files.map((file, index) => (
          <div key={index} className="relative w-full md:w-80 h-80 md:h-96 m-2 border rounded-[20px] overflow-hidden flex-shrink-0">
            {file.type.startsWith('image') ? (
              <img src={URL.createObjectURL(file)} alt={`Image ${index}`} className="w-full h-full object-cover rounded-[20px]" />
            ) : (
              <video controls src={URL.createObjectURL(file)} className="w-[contain] h-full object-cover rounded-[20px]" />
            )}
            <button
              onClick={(event) => handleRemoveFile(event, index)}
              className="absolute top-2 right-2 text-white bg-red-600 rounded-full p-1 hover:bg-red-800"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Date(props){
  return(
    <>
    <div className="div w-full flex flex-row justify-between gap-[10px]" >
    <select name="" id="" className="p-3 shadow-sm rounded-[10px] outline-none w-full">
     {props.days?props.days.map((day,index)=>(<option key={index} value={day.day}>{day.day}</option>)):<option>NULL</option>}
    </select>
    <span>
      <CgFormatSlash className="fill-greytextdark" style={{fontSize:'30px'}}/>
    </span>
    <div className="div p-3 rounded-[10px] w-full">
      {props.month?props.month.map((month,index)=>(<p key={index} className="text-[15px] text-center text-greytextdark">{month.month}</p>)):<p className="text-[15px] text-center text-greytextdark">Null</p>}
    </div>
    <CgFormatSlash className="fill-greytextdark" style={{fontSize:'30px'}}/>
    <div className="div p-3 rounded-[10px] w-full">
      {props.year?props.year.map((year,index)=>(<p key={index} className="text-[15px] text-center text-greytextdark">{year.year}</p>)):<p className="text-[15px] text-center text-greytextdark">Null</p>}
    </div>
    </div>
    
    </>
  )
}