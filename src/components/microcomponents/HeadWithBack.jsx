import{useNavigate} from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'

export default function HeadWithBack(props){
   const history=useNavigate()
   const handleBack=()=>{
    history(-1)
   }
    return(
        <>
            <div className="div p-3 bg-white sticky top-0 flex flex-row  justify-between  border-b-[1px] border-b-[greytextfade]">
             <span className='w-[35px] align-center'>
                <IoIosArrowBack className='fill-black text-[25px]' onClick={handleBack}/>
             </span>
             <div className="heading w-full  ">
                <p className='text-center  text-[20px] text-greytextdark'>
                    {
                        props.heading
                    }
                </p>
             </div>
            </div>

        </>
    )
}
export  function HeadWithProfile(props){
    const history=useNavigate()
    const handleBack=()=>{
     history(-1)
    }
     return(
         <>
             <div className="div p-3 bg-white sticky top-0 flex flex-row  justify-between  border-b-[1px] border-b-[greytextfade]">
              <span className='w-[35px] align-center'>
                 <IoIosArrowBack className='fill-black text-[25px]' onClick={handleBack}/>
              </span>
              <div className="heading w-full  ">
                <div className="img">
                    <img src="" alt="" loading='lazy'/>
                </div>
              </div>
             </div>
 
         </>
     )
 }