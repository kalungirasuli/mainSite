import { Outlet,Link } from "react-router-dom"
import { IoNotifications, IoCalendarSharp, IoHomeSharp,  IoPerson, IoSearchSharp, IoAddSharp } from "react-icons/io5"
import { MdMessage } from "react-icons/md"
import { Button3 } from "../microcomponents/RoundedButton"

export default function HomeTemp(){
    return(
        <>
         <div className="div flex flex-cols-3 w-full  xl:w-[70%] m-auto h-screen">
            <div className="left fixed bottom-0 left-0 right-0   md:p-[1px]  md:border-r-[1px] md:border-r-greytextfade md:w-[100px] md:sticky md:top-0  md:px-3 md:h-screen  xl:w-[23%] ">
            <div className="div logo align-left w-[max-content] p-3 rounded-[50%]  hover:bg-greytextfade  hidden md:block md:m-auto xl:m-0 ">
            <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg"className='w-[70px] md:w-[40px] ' viewBox="0 0 149 153.49"><g id="Layer_1-2"><g><g><rect x="1" y="1" width="147" height="151.49" rx="22.76" ry="22.76" fill="#fff"/><path d="m125.24,2c12,0,21.76,9.76,21.76,21.76v105.96c0,12-9.76,21.76-21.76,21.76H23.76c-12,0-21.76-9.76-21.76-21.76V23.76C2,11.76,11.76,2,23.76,2h101.47m0-2H23.76C10.64,0,0,10.64,0,23.76v105.96c0,13.12,10.64,23.76,23.76,23.76h101.47c13.12,0,23.76-10.64,23.76-23.76V23.76c0-13.12-10.64-23.76-23.76-23.76h0Z" fill="#29abe2"/></g><g><g><rect x="30.92" y="64.45" width="87.17" height="24.59" fill="#3b8aff"/><path d="m117.08,65.45v22.59H31.92v-22.59h85.17m2-2H29.92v26.59h89.17v-26.59h0Z" fill="#fff"/></g><g><rect x="62.59" y="31.82" width="23.81" height="89.85" fill="#3b8aff"/><path d="m85.41,32.82v87.85h-21.81V32.82h21.81m2-2h-25.81v91.85h25.81V30.82h0Z" fill="#fff"/></g></g></g></g></svg>
            </div>
            <ul className="flex flex-row justify-between z-50  bg-white border-t-[1px] border-t-greytextfade md:flex-col md:border-t-0 ">
                <Link to="" className="p-0 w-[max-content] m-auto xl:w-full xl:m-0">
                    <li className="p-3 w-[max-content] rounded-[30px] hover:bg-greytextfade  flex flex-row gap-5">
                        <IoHomeSharp className="icon"/>
                        <span className="text-center hidden text-[20px] xl:block">Home</span>
                    </li>
                </Link>
                <Link to="/appointment" className="p-0 w-[max-content] m-auto xl:w-full xl:m-0">
                    <li className="p-3 w-[max-content] rounded-[30px] hover:bg-greytextfade  flex flex-row gap-5">
                        <IoCalendarSharp className="icon"/>
                        <span className="text-center hidden text-[20px] xl:block">Appoinment</span>
                    </li>
                </Link>
                <Link to="/Message" className="p-0 w-[max-content] m-auto xl:w-full xl:m-0">
                    <li className="p-3 w-[max-content] rounded-[30px] hover:bg-greytextfade  flex flex-row gap-5">
                        <MdMessage className="icon"/>
                        <span className="text-center hidden text-[20px] xl:block">Messages</span>
                    </li>
                </Link>
                <Link to="" className="p-0 w-[max-content] m-auto xl:w-full xl:m-0">
                    <li className="p-3 w-[max-content] rounded-[30px] hover:bg-greytextfade  flex flex-row gap-5">
                        <IoNotifications className="icon"/>
                        <span className="text-center hidden text-[20px] xl:block">Notifications</span>
                    </li>
                </Link>
                <Link to="/profile" className="p-0 w-[max-content] m-auto xl:w-full xl:m-0">
                    <li className="p-3 w-[max-content] rounded-[30px] hover:bg-greytextfade  flex flex-row gap-5">
                        <IoPerson className="icon"/>
                        <span className="text-center hidden text-[20px] xl:block">Profile</span>
                    </li>
                </Link>
                <Link to="" className="p-0 w-[max-content] m-auto xl:w-full xl:m-0 xl:hidden">
                    <li className="p-3 w-[max-content] rounded-[30px] hover:bg-greytextfade  flex flex-row gap-5">
                        <IoSearchSharp className='icon'/>
                    </li>
                </Link>
                <Link to="/add-post" className="p-0 w-[max-content] m-auto absolute bottom-[50px] right-[10px] md:static xl:w-full xl:m-0 xl:block">
                    <li className="py-3 max-w-[200px]">
                        <div className="w-[max-content] bg-blue p-4 rounded-[50%] xl:hidden">
                        <IoAddSharp className="icon white" />
                        </div>
                  
                    <Button3 type='button' bg='bg-blue'  color='text-white' link='/add-post' text='Post' rounded='w-[100px] rounded-[30px] hidden xl:block'/> 
                    </li>
                </Link>
             <div className=""></div>
              
            </ul>
            </div>
            <div className="main w-full pb-[120px] overflow-y-auto overflow-x-hidden md:w-[80%]  md:border-r-[1px] md:border-r-greytextfade xl:w-[50%]">
                <Outlet/>
                
            </div>
            </div>
            </>
    )}
