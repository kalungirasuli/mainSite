import { useState, useEffect, useRef } from "react";
import { RiArrowDropDownLine, RiCloseLine } from "react-icons/ri";
import { TiMessages } from "react-icons/ti";
import { BsFillFileEarmarkArrowDownFill } from "react-icons/bs";
import {RotatingLines } from "react-loader-spinner";
export default function AppoinmentCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
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
                  John Doe
                </h1>
                <p className="mode text-greytextfade text-[15px]">Physical</p>
              </div>
            </div>
           </div>
            {/* the full details of the appointment */}
            {isModalOpen && (
              <div className="absolute  top-0 p left-0 w-full z-[1000] h-full bg-black bg-opacity-50 flex justify-center items-center overflow-x-hidden overflow-y-auto">
                <div
                  className="div modal bg-white h-[80%] overflow-y-auto max-w-sm m-5 mt-10 px-10 pb-10 rounded-lg md:max-w-md w-full  shadow-md relative"
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
                            <h1 className="text-[20px] text-greytextdark">Appointment details</h1>
                            <div className="div">
                                <div className="div">
                                    <p className="text-[17px] text-greytext">Date</p>
                                    <p className="text-[15px] text-greytextdark">12th July 2021</p>
                                </div>
                                <div className="div">
                                    <p className="text-[17px] text-greytext">Time</p>
                                    <p className="text-[15px] text-greytextdark">12:00 PM</p>
                                </div>
                                <div className="div">
                                    <p className="text-[17px] text-greytext ">Mode</p>
                                    <p className="text-[15px] text-greytextdark">Physical</p>
                                </div>
                                <div className="div">
                                    <p className="text-[17px] text-greytext ">Appointment ID</p>
                                    <p className="text-[15px] text-greytextdark">qjr29ur298wnefh23r</p>
                                </div>
                                <div className="div">
                                    <p className="text-[17px] text-greytext">Appoinment link</p>
                                    <a href="https://meet.google.com/wkekfkejeifiej" className="text-[15px] text-blue break-words">
                                    https://meet.google.com/wkekfkejeifiej
                                    </a>
                                </div>
                                <div className="div">
                                    <p className="text-[17px] text-greytext ">Doctor</p>
                                    <p className="text-[15px] text-greytextdark">Dr. John Doe</p>
                                </div>
                                <div className="div">
                                    <p className="text-[17px] text-greytext ">Location</p>
                                    <p className="text-[15px] text-greytextdark">Kampala, Mulago hispital</p>
                                </div>
                                <div className="div">
                                    <p className="text-[17px] text-greytext">Description</p>
                                    <p className="text-[15px] text-greytextdark breakwords h-[max-content] max-h-[400px] overflow-x-hidden overflow-y-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste ipsum incidunt, assumenda repellendus eligendi itaque dicta enim, aut adipisci quibusdam nihil? Alias, hic temporibus atque quis dolores numquam eius veniam quae voluptatum itaque quos earum animi eligendi dolorum eaque minus perferendis illo saepe deserunt modi repudiandae! Iure iste qui dicta quis nulla quia, cumque architecto porro ipsa, voluptate, repellat possimus non quam sapiente error similique ab cupiditate veniam eum earum. Nisi ad molestias, doloribus accusamus, aut quae, voluptatem ipsum commodi omnis ex nesciunt saepe dolore! Dicta a eveniet nesciunt, consectetur explicabo adipisci! Quae omnis neque cupiditate harum error consequatur itaque vero. Libero eaque suscipit vero autem? Nisi perferendis facere repudiandae ipsam non! Perferendis ullam nostrum repudiandae laboriosam repellat incidunt optio consectetur officiis voluptas blanditiis? Voluptate odio sequi, dolore odit molestias accusantium doloremque explicabo eum vero laudantium, aspernatur qui unde. Rerum tempore tenetur quae illum dolor doloremque, id aut, eos sit modi doloribus cupiditate, ipsa eligendi molestiae dolores voluptate? Laboriosam iusto error mollitia repellat, veritatis reprehenderit nam quod placeat amet sunt adipisci natus architecto quo hic sit nobis praesentium rerum! Quo aliquam, vero voluptates consectetur, aspernatur autem officiis assumenda beatae quas quam enim harum esse quisquam dolores? Officiis nihil qui inventore!</p>
                                </div>
                                <div className="div flex gap-[30px] justify-start pt-10">
                                            <span>
                                            <TiMessages className="fill-greytextdark" style={{fontSize:'25px'}}/>
                                            </span>  
                                            <span>
                                            <BsFillFileEarmarkArrowDownFill className="fill-greytextdark" style={{fontSize:'25px'}}/>
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
