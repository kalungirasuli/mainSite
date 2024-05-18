import { Outlet } from "react-router-dom"

export default function Temp(){
    return(
        <>
          <div className="div bg-smoke m-0 h-screen lg:p-[15%] overflow-y-auto overflow-x-hidden xl:p-[50px]">
          <Outlet/>
          </div>
        </>
    )
}