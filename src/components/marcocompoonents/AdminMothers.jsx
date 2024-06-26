
import HeadWithBack from "../microcomponents/HeadWithBack";
import { Search } from "../microcomponents/textComponents";
import AdminUserSingle from "../microcomponents/AdminUserSingle";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function  AdminMothers() {
  const [mothers, setMothers] = useState([]); // State to store fetched doctors
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

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

        fetchMothers();
      } catch (error) {
        console.error("Error checking admin status:", error);
        navigate('/User/sign-in');
      }
    };



    const fetchMothers = async () => {
      const mothersRef = collection(db, "mothers");

    

      try {
        const doctorSnapshot = await getDocs( mothersRef);
        setMothers(doctorSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

        console.log(mothers)
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    checkAdmin();
    
  }, [user, navigate])
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
          <div className="div w-[90%] m-auto flex flex-wrap  gap-[10px] pt-5">
          {mothers.map((mother) => (
             <AdminUserSingle 
             //  the use type group must be retuned please to handle ui logic please isaac

             key={mother.id}
             user={'mother'}
             name={mother.firstName +" " + mother.secondName} 
             time={mother.timestamp}
             email={mother.email}
             doctorId={mother.uid}
            // this deactives an account 
             status='Deactived'
            //  the shows after the mother has created it
             Description={ mother.bio || 'Am a mother the treates people well'}
             show={false}
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
