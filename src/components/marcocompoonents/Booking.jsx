import React, { useState } from "react";
import HeadWithBack from "../microcomponents/HeadWithBack";
import { Date, Time, File, TextArea } from "../microcomponents/textComponents";
import { Button3 } from "../microcomponents/RoundedButton";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBookingDetails } from "../../redux/userSlice";

export default function Booking() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedMode, setSelectedMode] = useState('');
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
 const user = useSelector(state => state.auth.user)
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const timeSlots = [
    '08:00-08:30', '08:30-09:00', '09:00-09:30', '09:30-10:00',
    '10:00-10:30', '10:30-11:00', '11:00-11:30', '11:30-12:00',
    '12:00-12:30', '12:30-13:00', '13:00-13:30', '13:30-14:00',
    '14:00-14:30', '14:30-15:00', '15:00-15:30', '15:30-16:00',
    '16:00-16:30', '16:30-17:00'
  ];
  const modes = ['Physical', 'Online'];
  const handleBooking = async (event) => {
    event.preventDefault();

    try {
      await addDoc(collection(db, "bookings"), {
        day: selectedDay,
        time: selectedTime,
        mode: selectedMode,
        file: file ? file.name : '',
        description: description,
        uid: user
      });
      alert("Booking successful!");
      dispatch(setBookingDetails({
        day: selectedDay,
        time: selectedTime,
        mode: selectedMode,
        file: file? file.name : '',
        description: description,
      }));
      navigate('/appointment/doctor/checkout');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };


 
  return (
    <>
      <HeadWithBack heading="Booking Appointment" />
      <div className="div w-[90%] m-auto pt-10">
        <div className="div relative -z-50 w-[70px] h-[70px] rounded-[50%] m-auto md:w-[150px] md:h-[150px]">
          <img src="https://picsum.photos/200/300" className="w-full h-full rounded-[50%] border-" alt="loading" loading='lazy' />
          <span className="w-[max-content] h-[max-content] absolute top-[0px] right-[10px]">
          </span>
        </div>
        <form onSubmit={handleBooking} className="w-full">
          <div className="div w-[90%] m-auto">
          <Time options={days} label='Select a day' onChange={(e) => setSelectedDay(e.target.value)} />

          </div>
          <div className="div flex flex-col md:flex-row justify-between gap-[30px] w-[90%] m-auto">
          <Time options={timeSlots} label='Select time' onChange={(e) => setSelectedTime(e.target.value)} />
            <Time options={modes} label='Select a mode' onChange={(e) => setSelectedMode(e.target.value)} />
          </div>
          <div className="duv w-[90%] m-auto">
            <File label='Attach medical files (if there is any)' type='file' onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <TextArea placeholder='Describe your issue to the doctor in less than 300 words' onChange={(e) => setDescription(e.target.value)} />
          <div className="div w-[90%] p-5 m-auto mt-10">
            <Button3 text='Continue' bg='bg-blue' color='text-white' rounded='rounded-[10px]' width='w-[90%] m-auto' onClick={handleBooking}/>
          </div>
        </form>
      </div>
    </>
  );
}
