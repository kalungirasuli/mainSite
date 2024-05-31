import HeadWithBack from "../microcomponents/HeadWithBack"
import { Input } from "../microcomponents/textComponents"
import { Button3 } from "../microcomponents/RoundedButton"
import { doc } from "firebase/firestore"
export default function Checkout(){

    const  data={
        doctor:'John Doe',
        mode:'Online',
        time:'22:00-23-00',
        date:'Tue/04/2024'
    }
    return(
        <>
<div className="div">
   <HeadWithBack heading='Check out appoinment'/> 
   <div className="div w-[90%] m-auto mt-10 shadow-lg rounded-lg pt-5">
{/* summary of the booking */}
        <h2 className="w-[max-content] text-greytextafade m-auto text-[20px]">Booking summary</h2>
   <p className="flex flex-row text-greytextdark text-[20px] p-4 justify-evenly" ><span className="font-bold text-greytextdark text-left">Pedetriciation  </span>:<span>{data.doctor}</span></p>
    <p className="flex flex-row text-greytextdark text-[20px] p-4 justify-evenly"><span className="font-bold text-greytextdark text-left "> Mode </span>:<span>{data.mode}</span></p>
    <p className="flex flex-row text-greytextdark text-[25px] p-4 justify-evenly"><span className="font-bold text-greytextdark text-left ">Time : </span>:<span>{data.time}</span></p>
    <p className="flex flex-row text-greytextdark text-[20px] p-4 justify-evenly"><span className="font-bold text-greytextdark  text-left ">Date : </span>:<span>{data.date}</span></p>
   </div>
   <form action=" w-[90%] m-auto mt-[50px] pt-[100px]">
     <div className="div pt-[50px]">
         <Input label='MTN Phone number' placeholder='Enter phone number (MTN)'/>
    </div>
      <div className="div mt-5 w-full">
            <Button3 text='Check out' bg='bg-blue' color='text-white' rounded='rounded-[10px]' width='w-[90%] m-auto'/>
      </div>
   </form>
</div>
        </>
    )
}