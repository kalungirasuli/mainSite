import  { useEffect, useState } from "react";

import {Doctor} from "../microcomponents/DoctorListcard";
import HeadWithBack from "../microcomponents/HeadWithBack";
import { Search } from "../microcomponents/textComponents";
import AdminUserSingle from "../microcomponents/AdminUserSingle";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function  AdminDoctors() {
 
  const [doctors, setDoctors] = useState([]); // State to store fetched doctors

  useEffect(() => {
    const fetchDoctors = async () => {
      const doctorsRef = collection(db, "doctors"); 

    

      try {
        const doctorSnapshot = await getDocs( doctorsRef);
        setDoctors(doctorSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

        console.log(doctors)
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors(); // Call the fetch function on component mount
  }, [])
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
