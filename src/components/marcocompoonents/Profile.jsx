import HeadWithBack from "../microcomponents/HeadWithBack";
import { Input,File,TextArea } from "../microcomponents/textComponents";
import { ProfileImage } from "../microcomponents/textComponents";
import { Button3, } from "../microcomponents/RoundedButton";
import RoundedButton from "../microcomponents/RoundedButton";
import { useEffect, useState } from "react";
import DatesAval from "../microcomponents/DateSelector";
import { useDispatch, useSelector } from "react-redux";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { setUserId } from "firebase/analytics";
import { useNavigate } from "react-router-dom";

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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const user = useSelector((state) => state.auth.user); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Query to find the document where uid matches the user
      const doctorQuery = query(collection(db, "doctors"), where("uid", "==", user));
      const querySnapshot = await getDocs(doctorQuery);
      if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        const userDoc = doc(db, "doctors", docId);
        await updateDoc(userDoc, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          bio: formData.bio,
        });

        // Handle profile image upload if needed
        if (profileImage) {
          // Add your image upload logic here if required
        }

        alert('updated your profile')
      } else {
        console.error("No matching documents.");
      }
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  return (
    <div className="overflow-y-auto pb-[120px]">
      <div className="w-[50px] h-[50px] relative m-auto mt-[50px] md:w-[100px] md:h-[100px]">
        <div className="absolute bottom-0 right-[10px] bg-white p-2 rounded-full w-[max-content]">
          <ProfileImage />
        </div>
        <img
          src={profileImage ? URL.createObjectURL(profileImage) : "https://picsum.photos/200/300"}
          alt=""
          className="w-full h-full rounded-full"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <Input label="Edit First name" name="firstName" placeholder="Enter name" value={formData.firstName} onChange={handleChange} />
        <Input label="Edit Last name" name="lastName" placeholder="Enter name" value={formData.lastName} onChange={handleChange} />
        <div className="w-[300px] m-auto pt-[20px] md:w-[450px]">
          <Button3
            bg="bg-bluebutton"
            color="text-black"
            rounded="rounded-[10px]"
            text="Edit password"
          />
        </div>
        <div className="w-[300px] m-auto pt-[20px] md:w-[450px]">
          <DatesAval />
        </div>
        <File label="Edit Profile Picture" type="file" onChange={handleImageChange} />
        <div className="w-[340px] m-auto pt-[20px] md:w-[500px]">
          <TextArea label="Edit Bio" name="bio" placeholder="Enter bio" value={formData.bio} onChange={handleChange} />
        </div>
        <div className="w-[300px] m-auto pt-[20px] md:w-[450px]">
          <RoundedButton text="Save" type="submit" onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
};



const Mother = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });
  const user = useSelector((state) => state.auth.user); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Query to find the document where uid matches the user
      const motherQuery = query(collection(db, "mothers"), where("uid", "==", user));
      const querySnapshot = await getDocs(motherQuery);
      if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        const userDoc = doc(db, "mothers", docId);
        await updateDoc(userDoc, {
          firstName: formData.firstName,
          lastName: formData.lastName
        });

        alert('Updated your profile');
      } else {
        console.error("No matching documents.");
      }
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  return (
    <>
      <div className="img overflow-y-auto w-[50px] h-[50px] relative m-auto mt-[50px] md:w-[100px] md:h-[100px]">
        <div className="div absolute bottom-0 right-[10px] bg-white p-2 rounded-full w-[max-content]">
          <ProfileImage />
        </div>
        <img src="https://picsum.photos/200/300" alt="" className="w-full h-full rounded-full" />
      </div>
      <form onSubmit={handleSubmit}>
        <Input 
          label="Edit First name" 
          placeholder="Enter name" 
          name="firstName" 
          value={formData.firstName} 
          onChange={handleChange} 
        />
        <Input 
          label="Edit Last name" 
          placeholder="Enter name" 
          name="lastName" 
          value={formData.lastName} 
          onChange={handleChange} 
        />
        <div className="w-[300px] m-auto pt-[20px] md:w-[450px]">
          <Button3 
            bg="bg-bluebutton" 
            color="text-black" 
            rounded="rounded-[10px]" 
            text="Edit password" 
          />
        </div>
        <div className="w-[300px] m-auto pt-[20px] md:w-[450px]">
          <RoundedButton 
            text="Save" 
            type="submit"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </>
  );
};


export default function DoctorProfile() {
  const user = useSelector(state => state.auth.user);
  const [userType, setUserType] = useState(null);

  const navigate = useNavigate()
    useEffect(() => {
    
  
      // Function to determine user type
      const determineUserType = async () => {
        if (user) {
          try {
            console.log("User ID: ", user);
            const uid = user;
  
            // Check if the user is a doctor
            const doctorQuery = query(collection(db, 'doctors'), where('uid', '==', uid));
            const doctorSnapshot = await getDocs(doctorQuery);
  
            if (!doctorSnapshot.empty) {
              setUserType('doctor');
              console.log("User is a doctor");
              return;
            }
  
            // Check if the user is a mother
            const motherQuery = query(collection(db, 'mothers'), where('uid', '==', uid));
            const motherSnapshot = await getDocs(motherQuery);
  
            if (!motherSnapshot.empty) {
              setUserType('mother');
              console.log("User is a mother");
            }
          } catch (error) {
            console.error("Error determining user type: ", error);
          }
        } else {
          navigate('/User/')
          console.log("No user found");
        }
      };
  
      determineUserType();
  

    }, [user]);
    return (
        <>
            <HeadWithBack heading=" Profile" />
           {userType==='doctor'?<Doctor/>:<Mother/>}
           
        </>
    );
}

