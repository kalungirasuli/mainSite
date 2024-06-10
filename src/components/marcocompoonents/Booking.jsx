import React, { useState, useEffect } from "react";
import HeadWithBack from "../microcomponents/HeadWithBack";
import { Time, File, TextArea } from "../microcomponents/textComponents";
import { Button3 } from "../microcomponents/RoundedButton";
import { addDoc, collection, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBookingDetails } from "../../redux/userSlice";

export default function Booking() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedMode, setSelectedMode] = useState('');
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [availability, setAvailability] = useState({});
  const [days, setDays] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const modes = [ 'select mode','Physical', 'Online'];

  useEffect(() => {
    const fetchDoctorAvailability = async () => {
      try {
        const doctorDoc = doc(db, "doctors", id);
        const doctorSnapshot = await getDoc(doctorDoc);
        if (doctorSnapshot.exists()) {
          const doctorData = doctorSnapshot.data();
          setAvailability(doctorData.availability || {});
          setDays(Object.keys(doctorData.availability || {}).filter(day => doctorData.availability[day].length > 0));
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    fetchDoctorAvailability();
  }, [id]);

  const handleBooking = async (event) => {
    event.preventDefault();

    try {
      await addDoc(collection(db, "bookings"), {
        userId: "1234",
        doctorId: id,
        day: selectedDay,
        time: selectedTime,
        mode: selectedMode,
        file: file ? file.name : '',
        description: description,
      });

      dispatch(setBookingDetails({ day: selectedDay, time: selectedTime , mode :selectedMode}));
      alert("Booking successful!");
      navigate(`/appointment/doctor/${id}/checkout`);
    } catch (error) {
      console.error("Error adding booking: ", error);
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
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="border p-2 rounded w-[300px] m-auto mt-4 md:w-[500px]"
            >
              <option value="" disabled>Select Day</option>
              {days.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
          {selectedDay && (
            <div className="div w-[90%] m-auto">
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="border p-2 rounded w-[300px] m-auto mt-4 md:w-[500px]"
              >
                <option value="" disabled>Select Time</option>
                {availability[selectedDay].map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          )}
          <div className="div flex flex-col md:flex-row justify-between gap-[30px] w-[90%] m-auto">
            <Time options={modes} label='Select a mode' onChange={(e) => setSelectedMode(e.target.value)} />
          </div>
          <div className="div w-[90%] m-auto">
            <File label='Attach medical files (if there is any)' type='file' onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <TextArea placeholder='Describe your issue to the doctor in less than 300 words' onChange={(e) => setDescription(e.target.value)} />
          <div className="div w-[90%] p-5 m-auto mt-10">
            <Button3 text='Continue' bg='bg-blue' color='text-white' rounded='rounded-[10px]' width='w-[90%] m-auto' type='submit'  onClick= {handleBooking}/>
          </div>
        </form>
      </div>
    </>
  );
}
