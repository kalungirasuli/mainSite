import HeadWithBack from "../microcomponents/HeadWithBack";
import { Input,File,TextArea } from "../microcomponents/textComponents";
import { ProfileImage } from "../microcomponents/textComponents";
import { Button3, } from "../microcomponents/RoundedButton";
import RoundedButton from "../microcomponents/RoundedButton";
import { useState } from "react";
import DatesAval from "../microcomponents/DateSelector";

const DoctorAvailabilityForm = () => {
  const [daysChecked, setDaysChecked] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  const [availability, setAvailability] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });
  
  const handleAddHour = (day,event) => {
    const newHour = day.trim();
    if (newHour && !availability[day].includes(event.target.value.trim())) {
      setAvailability({
        ...availability,
        [day]: [...availability[day], newHour]
      })
  }
  const handleCheck = (day) => {
    setDaysChecked({ ...daysChecked, [day]: !daysChecked[day] });
  };
  return (
    <div className="p-4">
      {Object.keys(availability).map((day) => (
        <div key={day} className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              onChange={() => handleCheck(day)}
              checked={daysChecked[day]}
            />
            {day}
          </label>
          {daysChecked[day] && (
            <div className="mt-2">
              <input
                type="text"
                className="border p-1 rounded"
                placeholder="Add available hour"
                onChange={((e) => handleAddHour(day,e.target.value))}  
              />
              <div
                className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
                onClick={(e) => handleAddHour(day,e)}
              >
                Add Hour
              </div>
              <div className="mt-2">
                {availability[day].map((hour) => (
                  <div
                    key={hour}
                    className="flex items-center justify-between bg-gray-100 p-2 rounded mt-1"
                  >
                    <span>{hour}</span>
                    <button
                      className="text-red-500"
                      // onClick={() => handleRemoveHour(day, hour)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
}
const Doctor = () => {
  const submit=(event)=>{
  event.preventDefault
    console.log('submitted')
  }
  
  return (
    <>
    <div className="div overflow-y-auto pb-[120px]">
    <div className="img w-[50px] -z-50 h-[50px]  relative m-auto mt-[50px] md:w-[100px] md:h-[100px]">
        <div className="div absolute bottom-0 right-[10px] bg-white p-2 rounded-full w-[max-content]">
          <ProfileImage />
        </div>
        <img
          src="https://picsum.photos/200/300"
          alt=""
          className="w-full h-full rounded-full"
        />
      </div>
      <form action='' onSubmit={(e)=>submit(e)}>
        <Input label="Edit First name" placeholder="enter name" />
        <Input label="Edit Last name" placeholder="enter name" />
        <div className="w-[300px] m-auto pt-[20px] md:w-[450px]">
          <Button3
            bg="bg-bluebutton"
            color="text-black"
            rounded="rounded-[10px]"
            text="Edit password"
          />
        </div>
        <div className="w-[300px] m-auto pt-[20px] md:w-[450px]">
          <DatesAval/>
        </div>
        <File label="Edit Profile Picture" type="file" />

        <div className="div w-[340px] m-auto pt-[20px] md:w-[500px]">
          <TextArea label="Edit Bio" placeholder="enter bio" />
        </div>
        <div className="w-[300px] m-auto pt-[20px] md:w-[450px]">
          <RoundedButton text="Save" />
        </div>
      </form>
    </div>
    </>
  );
};


function Mother(){
    return(
        <>
        <div className="img overflow-y-auto  w-[50px] h-[50px]  relative m-auto mt-[50px] md:w-[100px] md:h-[100px] ">
                <div className="div absolute bottom-0 right-[10px]  bg-white p-2 rounded-full w-[max-content]"><ProfileImage/></div>
                    <img src="https://picsum.photos/200/300" alt="" className="w-full h-full rounded-full" />
                    
                </div>
                <form action="">
                   <Input label='Edit First name' placeholder='enter name' />
                   <Input label='Edit Last name' placeholder='enter name' />
                   <div className=" w-[300px] m-auto pt-[20px] md:w-[450px]">
                   <Button3 bg='bg-bluebutton' color='text-black' rounded='rounded-[10px]' text='Edit password'/>
                   </div>
                 
                    <div className="w-[300px] m-auto pt-[20px] md:w-[450px]">
                        <RoundedButton  text='Save' />
                    </div>
                </form>
        </>
    )
}

export default function DoctorProfile() {
    const [user,setuser]=useState('doctor')
    return (
        <>
            <HeadWithBack heading=" Profile" />
           {user==='doctor'?<Doctor/>:<Mother/>}
           
        </>
    );
}

