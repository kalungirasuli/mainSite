import AppoinmentCard from "../microcomponents/ApppoinmentCard";
import HeadWithBack from "../microcomponents/HeadWithBack";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
export default function ViewAppointments() {
  const [user, setUser] = useState('mother');
  return (
    <>
      <div>
        <HeadWithBack heading="My appointments" />
        {/* the sett the add appointment button visible if the user is a mother and  hidden if the user is not a mother */}
       {
          user === 'mother' ? 
          <div className="div flex justify-end p-10">
            <Link to="/appointment/booking" className="div flex gap-[10px] text-bluegreen">
              <IoMdAdd className="fill-bluegreen" style={{fontSize:'30px'}}/>
              <p className="text-bluegreen">Book an appointment</p>
            </Link>
          </div>
          : ''
       }
       {/* end of button */}
        <div className="div p-10 flex flex-wrap gap-[20px]">
         
          {/* the appointment card */}
         <AppoinmentCard/>
          {/* end of the card */}
        </div>
      </div>
    </>
  );
}
