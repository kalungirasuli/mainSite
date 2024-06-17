import { useState, useEffect, useRef } from "react";
import { RiArrowDropDownLine, RiCloseLine } from "react-icons/ri";
import { TiMessages } from "react-icons/ti";
import { BsFillFileEarmarkArrowDownFill } from "react-icons/bs";
export default function AdminUserSingle(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current) {
        setIsModalOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  
  return (
    <>
      
          {/* the appointment card */}
       
          
          <div className="div flex flex-col "  onClick={() => setIsModalOpen(!isModalOpen)}>
           <div className="div flex flex-col gap-[20px] justify-between w-[150px] bg-white  shadow-md rounded-[10px] p-[10px]  relative">
           <div className="img w-full flex justify-center">
              <span className="w-[50px] h-[50px] m-auto">
              <img src="https://picsum.photos/200/300" className="w-full h-full rounded-full" alt=" loading" loading="lazy" />
              </span>
            </div>
            <div className="details">
              <div className="dropdowm flex justify-end w-[max-content] absolute top-0 right-0">
                <span
                  className="w-[max-content] rouned-full p-2 focus:bg-bluegreen"
                  onClick={() => setIsModalOpen(!isModalOpen)}
                >
                  <RiArrowDropDownLine className="fill-greytextdark" style={{fontSize:'30px'}}/>
                </span>
              </div>
              <div className=" text-center ">
                <h1 className=" name break-words text-greytextdark text-[17px]">
                  {props.name}
                </h1>
                <p className="mode text-greytextfade text-[15px]"> {props.status || "Deactive"}</p>
              </div>
            </div>
           </div>
            {/* the full details of the appointment */}
            {isModalOpen && (
              <div className="absolute  top-0 p left-0 w-full z-[1000] h-full bg-black bg-opacity-50 flex justify-center items-center overflow-x-hidden overflow-y-auto">
                <div
                  className="div modal bg-white h-[max-content] max-h-[80%]  overflow-y-auto max-w-sm m-5 mt-10 px-10 pb-10 rounded-lg md:max-w-md w-full  shadow-md relative"
                  ref={modalRef}
                >
                  <div className="div flex justify-end sticky top-0 bg-white py-5">
                  <button
                    className=" text-gray-600 w-[max-content]"
                    onClick={() => {
                      setIsModalOpen(false)
                      
                    }}
                  >
                    <RiCloseLine className="h-6 w-6" />
                  </button>
                  </div>
                  <div className="div">
                            <h1 className="text-[20px] text-greytextdark">User details</h1>
                            <div className="div">
                                <div className="div">
                                    <p className="text-[17px] text-greytext">Name</p>
                                    <p className="text-[15px] text-greytextdark"> Dr. {props.name}</p>
                                </div>
                                <div className="div">
                                    <p className="text-[17px] text-greytext">Date registered</p>
                                    <p className="text-[15px] text-greytextdark">{props.time}</p>
                                </div>
                                <div className="div">
                                    <p className="text-[17px] text-greytext ">Email address</p>
                                    <p className="text-[15px] text-greytextdark">{props.email}</p>
                                </div>
                                {/* the div only appears no doctors page so no need to write more logic for it */}
                                <div className={`${props.show?'block':'hidden'}`}>
                                    <p className="text-[17px] text-greytext ">Status</p>
                                    <form className="div flex gap-2">
                                    <input type="checkbox"  name="" id="status" onChange={props.onChangeCheck}/>
                                    <label htmlFor="status" className="text-[15px] text-greytextdark">{props.status||'Deactived'}</label>
                                    </form>
                                </div>
                                <div className="div">
                                    <p className="text-[17px] text-greytext">Description</p>
                                    <p className="text-[15px] text-greytextdark breakwords h-[max-content] max-h-[400px] overflow-x-hidden overflow-y-auto">{ props.description ||""}</p>
                                </div>
                                <div className="div flex gap-[30px] justify-start pt-10">
                                            <span>
                                            <TiMessages className="fill-greytextdark" style={{fontSize:'25px'}} onClick={props.handleMessagesClick}/>
                                            </span>  
                                             {/* the file only appears no doctors page so no need to write more logic for it */}
                                            <span className={`${props.show?'block':'hidden'}`}>
                                            <BsFillFileEarmarkArrowDownFill className="fill-greytextdark" style={{fontSize:'25px'}} onClick={props.downloadFile}/>
                                            </span>  
                                             {/* the delect only appears no doctors page so no need to write more logic for it */} 
                                            <span className={`${props.show?'block':'hidden'}bg-red-500 p-2 text-white text-center text-[15px] rounded-lg`} onClick={props.handleDelete}>
                                             DELETE
                                            </span>                                     
                                </div>
                            </div>
                        </div>
                 
                </div>
              </div>
            )}
          </div>
       
        
     
    </>
  );
}
