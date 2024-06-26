import { Outlet } from "react-router-dom"

export default function Temp(){
    return(
        <>
          <div className="div h-screen bg-smoke m-0 lg:p-[50px] overflow-x-hidden">
          <Outlet/>
          </div>
        </>
    )
}