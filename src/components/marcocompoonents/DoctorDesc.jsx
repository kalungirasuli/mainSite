import HeadWithBack from "../microcomponents/HeadWithBack"
import { FaCircle} from "react-icons/fa"
import { MdShare } from "react-icons/md"
import { IoMdStar } from "react-icons/io"
import { TiMessages } from "react-icons/ti"
import RoundedButton from "../microcomponents/RoundedButton"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoctorById } from "../../firebase/doctors"
export default function DoctorDesc(){

    const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const doctorDetails = await getDoctorById(id);
        setDoctor(doctorDetails);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleSubmit = () =>{
     console.log("cliked me ")
    return navigate(''); 
  }

  if (!doctor) {
    return <p>Loading...</p>;
  }
    return(
        <>
         <HeadWithBack heading="Pedetriciation Summary" />  
         <div className="flex flex-row w-[max-content] gap-[20px] m-auto p-5 mt-10 md:flex-col">
          <div className="div relative -z-50 w-[70px] h-[70px] rounded-[50%] m-auto md:w-[150px] md:h-[150px]">
                <img src={ doctor.image || "https://picsum.photos/200/300"} className="w-full h-full rounded-[50%]" alt="loading" loading='lazy' />
                <span className="w-[max-content] h-[max-content] absolute top-[0px] right-[10px] ">
                <FaCircle className="fill-green-600 text-5px"/>
                </span>
          </div>
            <div className="div flex flex-col items-center">
                <p className="text-[20px] text-greytextdark font-bold ">Dr.{doctor.firstName + doctor.secondName ||"Kalungi Rasuli"}</p>
                <p className="text-[15px] text-greytextdark">Pedetrician</p>
            </div>
         </div> 
        <div className="div w-[80%] m-auto pt-5" >
            <p className="text-[20px] font-bold text-greytextdark ">About Pedetriciation</p>
            <p className="text-[15px] text-greytextdark pt-5 break-words ">{doctor.bio || "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum atque blanditiis illo beatae quis delectus eum labore nisi? Eaque repudiandae cum inventore, expedita doloremque vel ratione tempora accusamus, excepturi laboriosam reiciendis dolore obcaecati libero voluptas ipsam omnis laborum illo. Alias quis expedita, laboriosam hic praesentium odio illo laborum reiciendis vel ducimus nihil quasi recusandae sunt esse, corrupti ipsum doloribus, debitis harum? Id explicabo suscipit eveniet quasi voluptatum sint, sequi quis reprehenderit vel pariatur asperiores amet exercitationem optio unde dolorem nobis nulla odit veritatis ad minima? Quo possimus quam molestias animi quibusdam consequatur cum nisi vitae, nihil maiores sequi excepturi placeat" }</p>
            <div className="flex flex-row gap-[20px] pt-5 w-">
            <MdShare className="fill-greytextdark" style={{fontSize:'30px'}}/>
            <IoMdStar className="fill-greytextdark" style={{fontSize:'30px'}}/>
            <TiMessages className="fill-greytextdark" style={{fontSize:'30px'}}/>

        </div>
        <div className="div py-5">
        <RoundedButton onClick={handleSubmit} text="Continue" link={`/appointment/doctor/${id}/booking`} />
        </div>
        </div>
        
        </>
    )
}