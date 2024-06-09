import AppoinmentCard from "../microcomponents/ApppoinmentCard";
import HeadWithBack from "../microcomponents/HeadWithBack";
export default function ViewAppointments() {
  
  return (
    <>
      <div>
        <HeadWithBack heading="My appointments" />
        <div className="div p-10 flex flex-wrap gap-[20px]">

          {/* the appointment card */}
         <AppoinmentCard/>
          {/* end of the card */}
        </div>
      </div>
    </>
  );
}
