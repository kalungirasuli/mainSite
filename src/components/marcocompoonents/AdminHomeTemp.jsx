import { Outlet,Link } from "react-router-dom"
import {  IoCalendarSharp, IoHomeSharp,  IoPerson, IoSearchSharp, IoAddSharp, IoWomanOutline } from "react-icons/io5"
import { BsPostcard } from "react-icons/bs";
import { MdMessage } from "react-icons/md"
import { Button3 } from "../microcomponents/RoundedButton"
import SavePost from "./SavePost";
import { MdMedication } from "react-icons/md";
import { useState } from "react";
import { useLocation,useParams } from "react-router-dom";
export default function AdminHomeTemp(){
    const[show,setShow]=useState(false)
    const toggle=()=>{
        !show?setShow(true):setShow(false)
        window.addEventListener('scroll',()=>{
            setShow(false)
        })
    }
    const location = useLocation();
    const { id } = useParams(); // Assuming you are using React Router's useParams hook

    // Check if the current pathname matches "/Message/:id"
    const isMessagesRoute = location.pathname === `/Message/${id}`
    return(
        <>
         <div className="div flex flex-cols-3 w-full bg-white  xxl:w-[80%] border-x-[1px] border-x-greytextfade m-auto h-screen  ">
            <div className={`${isMessagesRoute?'hidden':'block'} left fixed bottom-0 left-0 right-0   md:p-[1px]  md:border-r-[1px] md:border-r-greytextfade md:w-[100px] md:sticky md:top-0  md:px-3 md:h-screen  xl:w-[23%]`}>
            <div className="div logo align-left w-[max-content] p-3 rounded-[50%]  hover:bg-greytextfade  hidden md:block md:m-auto xl:m-0 ">
            <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg"className='w-[70px] md:w-[40px] ' viewBox="0 0 149 153.49"><g id="Layer_1-2"><g><g><rect x="1" y="1" width="147" height="151.49" rx="22.76" ry="22.76" fill="#fff"/><path d="m125.24,2c12,0,21.76,9.76,21.76,21.76v105.96c0,12-9.76,21.76-21.76,21.76H23.76c-12,0-21.76-9.76-21.76-21.76V23.76C2,11.76,11.76,2,23.76,2h101.47m0-2H23.76C10.64,0,0,10.64,0,23.76v105.96c0,13.12,10.64,23.76,23.76,23.76h101.47c13.12,0,23.76-10.64,23.76-23.76V23.76c0-13.12-10.64-23.76-23.76-23.76h0Z" fill="#29abe2"/></g><g><g><rect x="30.92" y="64.45" width="87.17" height="24.59" fill="#3b8aff"/><path d="m117.08,65.45v22.59H31.92v-22.59h85.17m2-2H29.92v26.59h89.17v-26.59h0Z" fill="#fff"/></g><g><rect x="62.59" y="31.82" width="23.81" height="89.85" fill="#3b8aff"/><path d="m85.41,32.82v87.85h-21.81V32.82h21.81m2-2h-25.81v91.85h25.81V30.82h0Z" fill="#fff"/></g></g></g></g></svg>
            </div>
            <ul className="flex flex-row justify-between z-50  bg-white border-t-[1px] border-t-greytextfade md:flex-col md:border-t-0 ">
                <Link to="/pannel" className="p-0 w-[max-content] m-auto xl:w-full xl:m-0">
                    <li className="p-3 w-[max-content] rounded-[30px] hover:bg-greytextfade  flex flex-row gap-5">
                        <BsPostcard className="icon"/>
                        <span className="text-center hidden text-[20px] xl:block">Posts</span>
                    </li>
                </Link>
                <Link to="/pannel/appointments" className="p-0 w-[max-content] m-auto xl:w-full xl:m-0">
                    <li className="p-3 w-[max-content] rounded-[30px] hover:bg-greytextfade  flex flex-row gap-5">
                        <IoCalendarSharp className="icon"/>
                        <span className="text-center hidden text-[20px] xl:block">All appoinments</span>
                    </li>
                </Link>
                <Link to="/pannel/Messages" className="p-0 w-[max-content] m-auto xl:w-full xl:m-0">
                    <li className="p-3 w-[max-content] rounded-[30px] hover:bg-greytextfade  flex flex-row gap-5">
                        <MdMessage className="icon"/>
                        <span className="text-center hidden text-[20px] xl:block">User messages</span>
                    </li>
                </Link>
                

                <div  className="p-0 w-[max-content] m-auto xl:w-full xl:m-0 cursor-pointer" >
                    <li className="p-3 w-[max-content] rounded-[30px] hover:bg-greytextfade  flex flex-row gap-5" onClick={toggle}>
                        <IoPerson className="icon"/>
                        <span className="text-center hidden text-[20px] xl:block">Users</span>
                    </li>
                    {show?(
                        
                            <ul className=" absolute z-40 -top-[70px] right-[100px] py-3 flex gap-2 md:static md:flex-col  ">
                    <Link to="/pannel/users/doctors" className="p-0 w-[max-content] m-auto xl:w-full xl:m-0">
                    <li className="p-3 w-[max-content] rounded-[30px] bg-slate-50 hover:bg-slate-200  flex flex-row gap-5"  onClick={toggle}>
                        <MdMedication className="icon text-black"/>
                        <span className="text-center hidden text-[20px] xl:block">Doctors</span>
                    </li>
                     </Link>
                     <Link to="/pannel/users/mothers" className="p-0 w-[max-content] m-auto xl:w-full xl:m-0">
                    <li className="p-3 w-[max-content] rounded-[30px] bg-slate-50 hover:bg-slate-200 active:bg-blue  flex flex-row gap-5"  onClick={toggle}>
                        <IoWomanOutline className="icon text-black"/>
                        <span className="text-center hidden text-[20px] xl:block">Mothers</span>
                    </li>
                      </Link>
                    </ul>
                    
                    ):''}
                </div>
                <div className="p-0 w-[max-content] m-auto xl:w-full xl:m-0 xl:hidden">
                    <li className="p-3 w-[max-content] rounded-[30px] hover:bg-greytextfade  flex flex-row gap-5">
                        <IoSearchSharp className='icon'/>
                    </li>
                </div>
                <Link to="/pannel/add-post" className="p-0 w-[max-content] m-auto  xl:w-full xl:m-0 xl:block">
                    <li className="py-3 max-w-[200px]">
                        <div className="w-[max-content] bg-blue p-4 rounded-[50%] xl:hidden">
                        <IoAddSharp className="icon white" />
                        </div>
                  
                    <Button3 type='button' bg='bg-blue'  color='text-white' link='/pannel/add-post' text='Post' rounded='w-[100px] rounded-[30px] hidden xl:block'/> 
                    </li>
                </Link>
             <div className=""></div>
              
            </ul>
            </div>
            <div className="main w-full pb-[120px] overflow-hidden md:w-[80%] md:pb-0  md:border-r-[1px] md:border-r-greytextfade xl:w-[50%]">
                <Outlet/>
            </div>
            <div className="div p-4 hidden lg:block xl:w-[30%] ">
                <SavePost/>   
            </div>
            </div>
            </>
    )}
