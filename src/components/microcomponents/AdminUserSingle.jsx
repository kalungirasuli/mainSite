
import React, { useState, useRef, useEffect } from "react";
import { RiArrowDropDownLine, RiCloseLine } from "react-icons/ri";
import { TiMessages } from "react-icons/ti";
import { BsFillFileEarmarkArrowDownFill } from "react-icons/bs";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminUserSingle(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user);
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

  const handleMessagesClick = async () => {
    if (user) {
      try {
        const q = query(
          collection(db, "messageRooms"),
          where("users", "array-contains", user)
        );
        const snapshot = await getDocs(q);
        let room = null;
        
        snapshot.forEach((doc) => {
          if (doc.data().users.includes(props.doctorId)) {
            room = doc;
          }
        });

        if (room) {
          navigate(`/pannel/Messages/${room.id}`);
        } else {
          const newRoom = await addDoc(collection(db, "messageRooms"), {
            users: [user, props.doctorId ],
            createdAt: new Date(),
          });
          navigate(`/pannel/Messages/${newRoom.id}`);
        }
      } catch (error) {
        console.error("Error handling messages click: ", error);
      }
    }
  };

  return (
    <>
      <div className="div flex flex-col" onClick={() => setIsModalOpen(!isModalOpen)}>
        <div className="div flex flex-col gap-[20px] justify-between w-[150px] bg-white shadow-md rounded-[10px] p-[10px] relative">
          <div className="img w-full flex justify-center">
            <span className="w-[50px] h-[50px] m-auto">
              <img src="https://picsum.photos/200/300" className="w-full h-full rounded-full" alt="loading" loading="lazy" />
            </span>
          </div>
          <div className="details">
            <div className="dropdown flex justify-end w-[max-content] absolute top-0 right-0">
              <span
                className="w-[max-content] rounded-full p-2 focus:bg-bluegreen"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(!isModalOpen);
                }}
              >
                <RiArrowDropDownLine className="fill-greytextdark" style={{ fontSize: '30px' }} />
              </span>
            </div>
            <div className="text-center">
              <h1 className="name break-words text-greytextdark text-[17px]">
                {props.name}
              </h1>
              <p className="mode text-greytextfade text-[15px]"> {props.status || "Deactivated"}</p>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <div className="absolute top-0 left-0 w-full z-[1000] h-full bg-black bg-opacity-50 flex justify-center items-center overflow-x-hidden overflow-y-auto">
            <div
              className="div modal bg-white h-[max-content] max-h-[80%] overflow-y-auto max-w-sm m-5 mt-10 px-10 pb-10 rounded-lg md:max-w-md w-full shadow-md relative"
              ref={modalRef}
            >
              <div className="div flex justify-end sticky top-0 bg-white py-5">
                <button
                  className="text-gray-600 w-[max-content]"
                  onClick={() => setIsModalOpen(false)}
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
                  <div className={`${props.show ? 'block' : 'hidden'}`}>
                    <p className="text-[17px] text-greytext ">Status</p>
                    <form className="div flex gap-2">
                      <input type="checkbox" name="status" id="status" onChange={props.onChangeCheck} />
                      <label htmlFor="status" className="text-[15px] text-greytextdark">{props.status || 'Deactivated'}</label>
                    </form>
                  </div>
                  <div className="div">
                    <p className="text-[17px] text-greytext">Description</p>
                    <p className="text-[15px] text-greytextdark breakwords h-[max-content] max-h-[400px] overflow-x-hidden overflow-y-auto">{props.description || ""}</p>
                  </div>
                  <div className="div flex gap-[30px] justify-start pt-10">
                    <span>
                      <TiMessages className="fill-greytextdark" style={{ fontSize: '25px' }} onClick={handleMessagesClick} />
                    </span>
                    <span className={`${props.show ? 'block' : 'hidden'}`}>
                      <BsFillFileEarmarkArrowDownFill className="fill-greytextdark" style={{ fontSize: '25px' }} onClick={props.downloadFile} />
                    </span>
                    <span className={`${props.show ? 'block' : 'hidden'} bg-red-500 p-2 text-white text-center text-[15px] rounded-lg`} onClick={props.handleDelete}>
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