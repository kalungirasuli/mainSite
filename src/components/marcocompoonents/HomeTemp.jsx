import { Outlet,Link } from "react-router-dom"
import { IoNotifications, IoCalendarSharp, IoHomeSharp,  IoPerson, IoSearchSharp } from "react-icons/io5"
import { MdMessage } from "react-icons/md"
import { Button3 } from "../microcomponents/RoundedButton"
export default function HomeTemp(){
   
    return(
        <>
         <div className="div flex flex-cols-3 w-full  xl:w-[70%] m-auto px-5">
            <div className="left w-full p-[1px] border-r-[1px] border-r-greytextfade md:w-[100px]  px-3 md:h-screen  xl:w-[20%] ">
            <div className="div logo align-left w-[max-content] p-3 rounded-[50%] transition-all-2 hover:bg-greytextfade  hidden md:block md:m-auto xl:m-0 ">
            <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg"className='w-[70px] md:w-[40px] ' viewBox="0 0 149 153.49"><g id="Layer_1-2"><g><g><rect x="1" y="1" width="147" height="151.49" rx="22.76" ry="22.76" fill="#fff"/><path d="m125.24,2c12,0,21.76,9.76,21.76,21.76v105.96c0,12-9.76,21.76-21.76,21.76H23.76c-12,0-21.76-9.76-21.76-21.76V23.76C2,11.76,11.76,2,23.76,2h101.47m0-2H23.76C10.64,0,0,10.64,0,23.76v105.96c0,13.12,10.64,23.76,23.76,23.76h101.47c13.12,0,23.76-10.64,23.76-23.76V23.76c0-13.12-10.64-23.76-23.76-23.76h0Z" fill="#29abe2"/></g><g><g><rect x="30.92" y="64.45" width="87.17" height="24.59" fill="#3b8aff"/><path d="m117.08,65.45v22.59H31.92v-22.59h85.17m2-2H29.92v26.59h89.17v-26.59h0Z" fill="#fff"/></g><g><rect x="62.59" y="31.82" width="23.81" height="89.85" fill="#3b8aff"/><path d="m85.41,32.82v87.85h-21.81V32.82h21.81m2-2h-25.81v91.85h25.81V30.82h0Z" fill="#fff"/></g></g></g></g></svg>
            </div>
            <ul className="flex flex-row justify-between fixed bottom-0 left-0 right-0  md:flex-col md:static ">
                <Link to="" className="p-0 w-[max-content] m-auto xl:w-full xl:m-0">
                    <li className="p-3 w-[max-content] rounded-[30px] hover:bg-greytextfade  flex flex-row gap-5">
                        <IoHomeSharp className="icon"/>
                        <span className="text-center hidden text-[25px] xl:block">Home</span>
                    </li>
                </Link>
                <Link to="" className="p-0 w-[max-content] m-auto xl:w-full xl:m-0">
                    <li className="p-3 w-[max-content] rounded-[30px] hover:bg-greytextfade  flex flex-row gap-5">
                        <IoCalendarSharp className="icon"/>
                        <span className="text-center hidden text-[25px] xl:block">Appoinment</span>
                    </li>
                </Link>
                <Link to="" className="p-0 w-[max-content] m-auto xl:w-full xl:m-0">
                    <li className="p-3 w-[max-content] rounded-[30px] hover:bg-greytextfade  flex flex-row gap-5">
                        <MdMessage className="icon"/>
                        <span className="text-center hidden text-[25px] xl:block">Messages</span>
                    </li>
                </Link>
                <Link to="" className="p-0 w-[max-content] m-auto xl:w-full xl:m-0">
                    <li className="p-3 w-[max-content] rounded-[30px] hover:bg-greytextfade  flex flex-row gap-5">
                        <IoNotifications className="icon"/>
                        <span className="text-center hidden text-[25px] xl:block">Notifications</span>
                    </li>
                </Link>
                <Link to="" className="p-0 w-[max-content] m-auto xl:w-full xl:m-0">
                    <li className="p-3 w-[max-content] rounded-[30px] hover:bg-greytextfade  flex flex-row gap-5">
                        <IoPerson className="icon"/>
                        <span className="text-center hidden text-[25px] xl:block">Profile</span>
                    </li>
                </Link>
                <Link to="" className="p-0 w-[max-content] m-auto xl:w-full xl:m-0 xl:hidden">
                    <li className="p-3 w-[max-content] rounded-[30px] hover:bg-greytextfade  flex flex-row gap-5">
                        <IoSearchSharp className='icon'/>
                    </li>
                </Link>
                <Link to="" className="p-0 w-[max-content] m-auto hidden xl:w-full xl:m-0 xl:block">
                    <li className="p-3">
                    <Button3 type='button' bg='bg-blue' color='text-white' text='Post' rounded='w-[100px]'/> 
                    </li>
                </Link>
            
              
            </ul>
            </div>
            <div className="main w-[75%] border-r-[1px] border-r-greytextfade p-x-5">
                <Outlet/>
            </div>
            <div className="right hidden lg:block lg:w-[25%]"></div>
         </div>
        </>
    )
}