import { HeadWithProfile } from "../microcomponents/HeadWithBack"
import { IoSend } from "react-icons/io5"
function MessageHolder(props){

  return(
    <>
    <div className={props.position}>
    <div className={props.class}>
        <p className='px-3 pt-3 text-left text-[16px] break-words'>Lorem ipsum  </p>
        <div className="time">
            <p className="text-right p-2 text-[12px] ">Today</p>
        </div>
    </div>
    </div>
    </>
  )  
}
export default function Discussion() {
    const classes={
        mother:'rounded-l-[10px] rounded-b-[10px] w-[max-content] max-w-[80%] bg-smoke text-black  ',
        doctor:'rounded-r-[10px] rounded-b-[10px] w-[max-content] max-w-[80%] bg-blue text-white ',
        doctorPosition:'flex items-start',
        motherPosition:'flex items-start justify-end'
    }
    return (
        <>
            <HeadWithProfile heading='Messages'/>
            <div className="div  w-full space-y-4 h-full relative -z-50">
                 {/* the message is sent by mother add classes.mother else classes.doctor */}
                <div className="message p-5 h-full overflow-y-auto ">
                <MessageHolder class={classes.doctor} position={classes.doctorPosition}/>
                </div>
                <div className="input flex gap-[10px] w-full bg-gray-500 p-2 absolute bottom-0  ">
                    <input type=" text" className="w-full h-[45px] rounded-[10px] p-2 Outline-0"/>
                    <span className="align-self-center p-2"><IoSend className=" fill-black focus:fill-blue  " style={{fontSize:'30px'}}/></span>
                </div>
            </div>

            
        </>
    )
}

