
import { Outlet } from "react-router-dom"
export default function Appointments(){
    
    return(
        <>
        <div className="w-full h-full overflow-y-auto">
        <Outlet/>
        </div>
          
        </>
    )
}