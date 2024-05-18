import { Outlet } from "react-router-dom"

export default function HomeTemp(){
    return(
        <>
         <div className="div">
            <div className="left"></div>
            <div className="main">
                <Outlet/>
            </div>
            <div className="right hidden lg:block"></div>
         </div>
        </>
    )
}