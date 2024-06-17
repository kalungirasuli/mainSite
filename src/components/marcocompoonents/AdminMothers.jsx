
import HeadWithBack from "../microcomponents/HeadWithBack";
import { Search } from "../microcomponents/textComponents";
import AdminUserSingle from "../microcomponents/AdminUserSingle";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function  AdminMothers() {
  const [mothers, setMothers] = useState([]); // State to store fetched doctors

  useEffect(() => {
    const fetchDoctors = async () => {
      const mothersRef = collection(db, "mothers");

    

      try {
        const doctorSnapshot = await getDocs( mothersRef);
        setMothers(doctorSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

        console.log(mothers)
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors(); // Call the fetch function on component mount
  }, [])
  return (
    <>
      <div className="div">
        <HeadWithBack heading='Mothers'/>
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
          {mothers.map((mother) => (
             <AdminUserSingle 
             //  the use type group must be retuned please to handle ui logic please isaac

             key={mother.id}
             user={'mother'}
             name={mother.firstName +" " + mother.secondName} 
             time={mother.timestamp}
             email={mother.email}

            // this deactives an account 
             status='Deactived'
            //  the shows after the mother has created it
             Description={ mother.bio || 'Am a mother the treates people well'}
             show={true}
             downloadFile={() => window.open(mother.licenseURL, '_blank')}
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
