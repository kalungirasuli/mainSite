import AppoinmentCard from "../microcomponents/ApppoinmentCard";
import HeadWithBack from "../microcomponents/HeadWithBack";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function ViewAppointments() {
  const [user, setUser] = useState('mother');
  return (
    <>
      <div>
        <HeadWithBack heading="My appointments" />
        {/* the sett the add appointment button visible if the user is a mother and  hidden if the user is not a mother */}
       {
          user === 'mother' ? 
          <div className="div flex justify-end w-full p-5">
         <Link to="/appointment/doctors" className="bg-bluebutton p-3 rounded-full" title="add an pointment" >
          <IoMdAdd className="fill-greytextdark" style={{fontSize:"30px"}} />
         </Link>
         </div>
          : ''
       }
       {/* end of button */}
        <div className="div p-10 flex flex-wrap gap-[20px] h-full overflow-y-auto w-full overflow-x-hidden">
         
          {/* the appointment card */}
         <AppoinmentCard/>
         
          {/* end of the card */}
        </div>
      </div>
    </>
  );
}
