
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import HeadWithBack from "../microcomponents/HeadWithBack";
import AppoinmentCard from "../microcomponents/ApppoinmentCard";
import { IoMdAdd } from "react-icons/io";

export default function ViewAppointments() {
  const [userType, setUserType] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const user = useSelector((state) => state.auth.user);
const navigate = useNavigate()
  useEffect(() => {
    const determineUserType = async () => {

      if (user) {
        try {
          const uid = user; 
          console.log(uid)

          // Check if the user is a doctor
          const doctorQuery = query(collection(db, 'doctors'), where('uid', '==', uid));
          const doctorSnapshot = await getDocs(doctorQuery);

          if (!doctorSnapshot.empty) {
            setUserType('doctor');
            return;
          }

          // Check if the user is a mother
          const motherQuery = query(collection(db, 'mothers'), where('uid', '==', uid));
          const motherSnapshot = await getDocs(motherQuery);

          if (!motherSnapshot.empty) {
            setUserType('mother');
            return;
          }

          // Default to fetching all bookings if user is not a doctor or mother
          setUserType('admin');
        } catch (error) {
          console.error("Error determining user type: ", error);
        }
      }
      else{
        navigate('/User/sign-in');
      }
    };

    const fetchBookings = async () => {
      if (user && userType !== null) {
        try {
          let bookingQuery;
          if (userType === 'doctor') {
            bookingQuery = query(collection(db, 'bookings'), where('doctorId', '==', user));
          } else if (userType === 'mother') {
            bookingQuery = query(collection(db, 'bookings'), where('userId', '==', user));
          } else {
            // Fetch all bookings for admin
            bookingQuery = query(collection(db, 'bookings'));
          }

          const bookingSnapshot = await getDocs(bookingQuery);
          const bookings = bookingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setAppointments(bookings);
          console.log('the booking data is ', bookings);
        } catch (error) {
          console.error("Error fetching bookings: ", error);
        }
      }
    };

    determineUserType();

    if (userType !== null) {
      fetchBookings();
    }
  }, [user, userType]); // Added userType to the dependency array

  return (
    <>
      <div>
        <HeadWithBack heading="My appointments" />
        {userType === 'mother' && (
          <div className="div flex justify-end w-full p-5">
            <Link to="/appointment/doctors" className="bg-bluebutton p-3 rounded-full" title="add an appointment">
              <IoMdAdd className="fill-greytextdark" style={{ fontSize: "30px" }} />
            </Link>
          </div>
        )}
        <div className="div p-10 flex flex-wrap gap-[20px] h-full overflow-y-auto w-full overflow-x-hidden">
          {appointments.map((appointment) => (
            <AppoinmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      </div>
    </>
  );
}