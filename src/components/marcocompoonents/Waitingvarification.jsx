import { styles,buttonStyle } from "../microcomponents/textComponents"
import { Button3 } from "../microcomponents/RoundedButton"
import HeaderLogo from "../microcomponents/HeaderLogo"
import { useState,useEffect } from "react"
export default function Waitingvarification(){
     const message={
        mother:"To ensure your account's security and enable us to communicate effectively, please verify your email address. Check your inbox for our verification email. if not received, check spam.",
        doctor:"Your documents are currently under verififcation. We appreciate your patience and we will responde by sending you an email soon. Thank you"
     }
     const buttontext={
        mother:'Resend message',
        doctor:'Cancel submission'
     }
     const altbuttontext={
        out:'Sign out of this account',
        in:'Sign in with another account'
     }
     let userturned='doctor'
     const[user,setUser]=useState('')
     const[color,setColor]=useState('')
     const[bg,setBg]=useState('')
     const[text,setText]=useState('')
     const check=()=>{
            if(userturned=='doctor'){
                setUser(userturned)
                setColor('text-white')
                setText(buttontext.doctor)
                setBg('bg-redlight')
            }else{
                setUser(userturned)
                setColor('text-blue')
                setText(buttontext.mother)
                setBg('bg-bluebutton')
            }
     } 
     useEffect(()=>{
        check()
     },[])
    return(
        <>
        <div className={`${styles}`} >
        <HeaderLogo head='Neonates'/>
        <div className={`${buttonStyle} bg-white rounded-[10px] shadow-lg p-5 mt-5`}>
           <p className="text-[13px] text-greytextdark md:text-[20px] ">{user=='mother'?message.mother:message.doctor}</p> 
           <Button3 width='w-[60%] mt-5' color={color} bg={bg} text={text}/>
        </div>
        {
        user=='doctor'?<div className={`${buttonStyle} mt-5`}><Button3 width='w-ful' color='text-blue' bg='bg-bluebutton' text={altbuttontext.in}/><p className="text-center text-greytextdark text-[15] my-2"> or</p><Button3 width='w-full ' color='text-white' bg='bg-blue' text={altbuttontext.out}/></div>:<div className="progress-bar flex flex-row  absolute bottom-[100px] left-0 right-0 w-[70%] m-auto lg:w-[50%] bg-greytextfade xl:w-[40%]"><hr className='bg-blue h-2 w-[20%]'/></div>
        }
        </div>
        </>
    )
}