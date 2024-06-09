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
  const [days, setDays] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const modes = ['Physical', 'Online'];

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const docRef = doc(db, "doctors", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setDays(Object.keys(data.availability || {}));
          setTimeSlots(Object.values(data.availability || {}).flat());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchAvailability();
  }, [id]);

  const handleBooking = async (event) => {
    event.preventDefault();

    try {
      await addDoc(collection(db, "bookings"), {
        day: selectedDay,
        time: selectedTime,
        mode: selectedMode,
        file: file ? file.name : '',
        description: description,
        uid: user.uid,
        doctorId: id
      });
      alert("Booking successful!");
      dispatch(setBookingDetails({
        day: selectedDay,
        time: selectedTime,
        mode: selectedMode,
        file: file ? file.name : '',
        description: description,
      }));
      navigate(`/appointment/doctor/${id}/checkout`);
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
            <Button3 text='Continue' bg='bg-blue' color='text-white' rounded='rounded-[10px]' width='w-[90%] m-auto' />
          </div>
        </form>
      </div>
    </>
  );
}
