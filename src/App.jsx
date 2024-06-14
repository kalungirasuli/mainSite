
import { useState,useEffect } from "react"
import Pageload from "./components/microcomponents/Pageload"
import { Routes,Route,BrowserRouter} from "react-router-dom"
import HomeTemp from "./components/marcocompoonents/HomeTemp"
import Temp from "./components/marcocompoonents/Temp"
import Discission from "./components/marcocompoonents/Discission"
import Mother from "./components/marcocompoonents/mother"
import Doctor from "./components/marcocompoonents/doctors"
import Waitingvarification from "./components/marcocompoonents/Waitingvarification"
import Home from "./components/marcocompoonents/Home"
import SignIn from "./components/marcocompoonents/Signin"

import Appointments from "./components/marcocompoonents/Appointments"
import DoctorAll from "./components/marcocompoonents/DoctorAll"
import DoctorDesc from "./components/marcocompoonents/DoctorDesc"
import Booking from "./components/marcocompoonents/Booking"
import Checkout from "./components/marcocompoonents/Checkout"

import Message from "./components/marcocompoonents/Messages"
import Discussion from "./components/marcocompoonents/Discussion"
import MessageRooms from "./components/marcocompoonents/MessageRooms"

import AddPost from "./components/marcocompoonents/AddPost"

import Profile from "./components/marcocompoonents/Profile"
import EditPassword from "./components/marcocompoonents/EditPassword"
import ViewAppointments from "./components/marcocompoonents/ViewAppointments"

import AdminHomeTemp from "./components/marcocompoonents/AdminHomeTemp"
function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }

        setDeferredPrompt(null);
      });
    }
  };
  
  return (
    <>
    <div className="div  ">
    <Pageload />
    {deferredPrompt && (
        <button onClick={handleInstallClick}>Install App</button>
      )}
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeTemp/>}>
              <Route index element={<Home/>}></Route>
              <Route path="add-post" element={<AddPost/>}></Route>
              <Route path="appointment" element={<Appointments/>}>
                  <Route index element={<ViewAppointments/>}></Route>
                  <Route path='doctors' element={<DoctorAll/>}></Route>
                  <Route path="doctor/:id" element={<DoctorDesc/>}></Route>
                  <Route path="doctor/:id/checkout" element={<Checkout/>}></Route>
                  <Route path="doctor/:id/booking" element={<Booking />} />
              </Route>
              <Route path="Message" element={<Message/>}>
                  <Route index element={<MessageRooms/>}></Route> 
                  <Route path=":id" element={<Discussion/>}></Route>
              </Route>
              <Route path="profile" element={<Profile/>}></Route>
              <Route path="profile/editpassword" element={<EditPassword/>}></Route>
              
      </Route>
      <Route path="/admin" element={<AdminHomeTemp/>}>
                    <Route index element={<Home/>}></Route>
                    <Route path="add-post" element={<AddPost/>}></Route>
                    <Route path="appointment" element={<Appointments/>}>
                        <Route index element={<ViewAppointments/>}></Route>
                    </Route>
                    <Route path="Message" element={<Message/>}>
                        <Route index element={<MessageRooms/>}></Route> 
                        <Route path=":id" element={<Discussion/>}></Route>
                    </Route>
                    <Route path="profile" element={<Profile/>}></Route>
                    <Route path="profile/editpassword" element={<EditPassword/>}></Route>
      </Route>
      <Route path="User" element={<Temp/>}>
              <Route index  element={<Discission/>}></Route>
              <Route path="sign-up-mother" element={<Mother/>}></Route>
              <Route path="sign-up-pedetricain" element={<Doctor/>}></Route>
              <Route path="sign-in" element={<SignIn/>}></Route>
              <Route path='verification' element={<Waitingvarification/>}></Route>
      </Route>
      
    </Routes>
    </BrowserRouter>
    
    </div> 
    </>
  )
   
}

export default App