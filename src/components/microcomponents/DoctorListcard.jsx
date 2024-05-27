import { FaCircle } from "react-icons/fa"
import { Link } from "react-router-dom"
export default function DoctorListcard(props){
    return(
        <>
            <Link to={props.link}>
            <div className="div p-3 pt-5 shadow-lg rounded-[10px] w-[170px]">
                <div className="div w-[60px] m-auto relative ">
                <img src='https://picsum.photos/200/300' className="rounded-full w-[50px] h-[50px] m-auto" loading="lazy" alt="" />
                <span className="absolute top-[5px] right-[2px]"><FaCircle className="fill-green-700" /></span>
                </div>
                <p className="font-bold text-black text-[15px] text-center pt-2" >Dr.Jojo Aminah</p>
                <p className="text-greytextfade text-center text-[14px] p-2">surgon</p>
                <div className="div w-[max-content] m-auto">
                <button className="font-bold bg-greenbutton text-center p-2 px-3 rounded-[10px] w-[max-content] m-auto">Appointment</button>
                </div>
            </div>
            </Link>

        </>
    )
}

