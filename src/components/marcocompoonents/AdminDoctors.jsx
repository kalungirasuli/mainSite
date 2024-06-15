import  { useEffect, useState } from "react";

import {Doctor} from "../microcomponents/DoctorListcard";
import HeadWithBack from "../microcomponents/HeadWithBack";
import { Search } from "../microcomponents/textComponents";
import AdminUserSingle from "../microcomponents/AdminUserSingle";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function  AdminDoctors() {
  const user = useSelector((state) => state.auth.user);
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        navigate('/User/sign-in');
        return;
      }

      const adminRef = collection(db, "admin");
      const q = query(adminRef, where("uid", "==", user));

      try {
        const adminSnapshot = await getDocs(q);
        if (adminSnapshot.empty) {
          navigate('/User/sign-in');
          return;
        }

        fetchDoctors();
      } catch (error) {
        console.error("Error checking admin status:", error);
        navigate('/User/sign-in');
      }
    };

    const fetchDoctors = async () => {
      const doctorsRef = collection(db, "doctors");

      try {
        const doctorSnapshot = await getDocs(doctorsRef);
        setDoctors(doctorSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    checkAdmin();
  }, [user, navigate]);
  return (
    <>
      <div className="div">
        <HeadWithBack heading='Doctors'/>
        <div className="div">
          <div className="div p-3 h-auto">
            <Search
              type="text"
              placeholder="Search a pediatrician"
              ids="search"
              classes="rounded-[10px] p-3 w-full border-0 text-left text-[15px] outline-none"
            />
          </div>
          <div className="div w-[90%] m-auto flex flex-wrap justify-between gap-[10px] pt-5">
          {doctors.map((doctor) => (
             <AdminUserSingle 
             //  the use type group must be retuned please to handle ui logic please isaac

             key={doctor.id}
             user={'mother'}
             name={doctor.firstName +" " + doctor.secondName} 
             time={doctor.timestamp}
             email={doctor.email}
             doctorId={doctor.uid}
            // this deactives an account 
             status='Deactived'
            //  the shows after the doctor has created it
             Description={ doctor.bio || 'Am a doctor the treates people well'}
             show={true}
             downloadFile={() => window.open(doctor.licenseURL, '_blank')}
            //  this initlizes a message between mother and admin
             handleMassageClick={console.log('message init')}
            //  the delete the mother form the platform
              onChangeCheck={console.log('cheing')}
             handleDelete={console.log('Delete Doctor')}
             />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
