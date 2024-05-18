import { GiSlicingArrow } from "react-icons/gi"
import { useState,useEffect } from "react"
import RoundedButton from "../microcomponents/RoundedButton"
import {Alt} from "../microcomponents/textComponents"
import HeaderLogo from "../microcomponents/HeaderLogo"
import { styles } from "../microcomponents/textComponents"
export default function Discission(){
    const style={
        fontSize:'20px'
    }
    const description={
        mother:"Dedicated mother,seeking healthcare guidance,proactive in child's well-being,values privacy and security,seeks personalized health plans,open to technology in healthcare,value healthcare accessibility.",
        doctor:"Dedicated pedetraciation, I give healthcare guidance ,proactive in  child's well-being ,values privacy and security,provide personalized health plans, open to technology in healthcare, value healthcare accessibility."
    }
    const [SelectedRole,setSelectedRole]=useState('')
    const[vary,setvary]=useState(0)
    useEffect(()=>{
        vary==0?setSelectedRole(description.mother):setSelectedRole(description.doctor)
    })
   const mother=()=>{
    setvary(0)
   }
   const doctor=()=>{
    setvary(1)
   }
    return(
        <>
         <div className={`${styles}`}>
            <HeaderLogo text='Choose a user role' head='Neonates'/>
            <div className="userroles grid grid-cols-2 gap-[20px] align-center w-[220px] m-auto pt-4 md:w-[420px]">
                <div className={`${vary==0?'border border-2 border-bluegreen  p-[3px] rounded-[10px]':''} mth relative w-[100px] m-auto  md:w-[200px]`} onClick={mother}>
                    <hr className={`${vary==0?'bg-greendark':'bg-white'} w-[20px] h-[20px] bg-greendark rounded-[50%] absolute top-[5px] left-[5px]`}/>
                    <img src="../../../../public/images/mother.png" alt="" className="w-[100%] h-[100%] rounded-[10px]" />
                    <p className="text-greytextdark text-center text-[15px] md:text-[20px] ">Mother</p>
                </div>
                <div className={`${vary==1?'border border-2 border-bluegreen  p-[3px] rounded-[10px]':''} dr relative w-[100px] m-auto md:w-[200px]` } onClick={doctor}>
                    <hr className={`${vary==1?'bg-greendark':'bg-white'} w-[20px] h-[20px]  rounded-[50%] absolute top-[5px] left-[5px]`}/>
                    <img src="../../../../public/images/doctor.png" alt="" className="w-[100%] h-[100%] rounded-[10px]" />
                    <p className="text-greytextdark text-center text-[15px] md:text-[20px]">Deditricain</p>
                </div>
            </div>
            <div className="decription w-[240px] m-auto pt-[20px] md:w-[450px]">
                <div className="title bg-smoke text-bluegreen p-[5px] w-[min-content] rounded-[5px] text-[15px] md:text-[20px]">
                    Description
                </div>
                <p className="text-[13px] text-greytextdark pt-2 md:text-[15px]" >{SelectedRole}</p>
                
            </div>
            <div className="continue w-[240px] m-auto pt-[20px] md:w-[450px]">
            <RoundedButton text='CONTINUE'/>
            <Alt highlightText='Sign-in' endText='instead'/>
            </div>
            
         </div>

        </>
    )
}