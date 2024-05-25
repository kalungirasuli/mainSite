import{useNavigate} from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'

export default function HeadWithBack(props){
   const history=useNavigate()
   const handleBack=()=>{
    history(-1)
   }
    return(
        <>
            <div className="div p-3 bg-white sticky top-0 flex flex-row justify-between">
             <span className='w-[35px] align-center'>
                <IoIosArrowBack className='fill-black text-[25px]' onClick={handleBack}/>
             </span>
             <div className="heading w-full">
                <p className='text-center-p-0 text-[20px] text-greytextdark'>
                    {
                        props.heading
                    }
                </p>
             </div>
            </div>

        </>
    )
}