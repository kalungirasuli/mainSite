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

import AddPost from "./components/marcocompoonents/AddPost"

import Profile from "./components/marcocompoonents/Profile"

import ViewAppointments from "./components/marcocompoonents/ViewAppointments"
function App() {
  
  return (
    <>
    <div className="div  ">
    <Pageload />
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeTemp/>}>
              <Route index element={<Home/>}></Route>
              <Route path="add-post" element={<AddPost/>}></Route>
              <Route path="appointment" element={<Appointments/>}>
                  <Route index element={<ViewAppointments/>}></Route>
                  <Route path='doctors' element={<DoctorAll/>}></Route>
                  <Route path="doctor/:id" element={<DoctorDesc/>}></Route>
                  <Route path="doctor/checkout" element={<Checkout/>}></Route>
                  <Route path="doctor/booking" element={<Booking/>}></Route>
                
              </Route>
              <Route path="Message" element={<Message/>}>
                  {/* <Route index element={<Discission/>}></Route> */}
                  <Route index element={<Discussion/>}></Route>
              </Route>
              <Route path="profile" element={<Profile/>}></Route>
              
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