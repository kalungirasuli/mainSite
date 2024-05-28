import  { useEffect, useState } from "react";

import DoctorListcard from "../microcomponents/DoctorListcard";
import HeadWithBack from "../microcomponents/HeadWithBack";
import { Search } from "../microcomponents/textComponents";
import { getAllDoctors } from "../../firebase/doctors";

export default function DoctorAll() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsList = await getAllDoctors();
        console.log("the doctors list are"+ doctorsList)
        setDoctors(doctorsList);
        console.log(doctors)
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="div">
        <HeadWithBack heading="Pediatricians list" />
        <div className="div">
          <div className="div p-3 h-auto">
            <Search
              type="text"
              placeholder="Search a pediatrician"
              ids="search"
              classes="rounded-[10px] p-3 w-full border-0 text-left text-[15px] outline-none"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="div w-[90%] m-auto flex flex-wrap justify-between gap-[10px] pt-5">
            {filteredDoctors.map(doctor => (
              <DoctorListcard
                key={doctor.id}
                name={doctor.firstName + ' ' + doctor.secondName
                }
                work={doctor.work}
                link={`/doctor/${doctor.id}`}
                image={doctor.image}
                online={doctor.online}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
