
import { useState, useEffect } from "react"
import Pageload from "./components/microcomponents/Pageload"
import { Routes, Route, BrowserRouter } from "react-router-dom"
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
import Postsingle from "./components/marcocompoonents/Postsingle"
import Profile from "./components/marcocompoonents/Profile"
import EditPassword from "./components/marcocompoonents/EditPassword"
import ResetPassword from "./components/marcocompoonents/ResetPassword"
// import NewPassword from "./components/marcocompoonents/NewPassword"
import ViewAppointments from "./components/marcocompoonents/ViewAppointments"

import AdminHomeTemp from "./components/marcocompoonents/AdminHomeTemp"
import AdminUsers from "./components/marcocompoonents/AdminUser"
import AdminDoctors from "./components/marcocompoonents/AdminDoctors"
import AdminMothers from "./components/marcocompoonents/AdminMothers"


// import Install from "./components/microcomponents/Install"
function App() {

  return (
    <>
      <div className="div bg-smoke  ">
        {/* <Install /> */}
        <BrowserRouter>


          {/* the general routes */}
          <Routes>
            <Route path="/" element={<HomeTemp />}>
              <Route index element={<Home />}></Route>
              <Route path='post' element={<Postsingle />}></Route>
              <Route path="add-post" element={<AddPost />}></Route>
              <Route path="appointment" element={<Appointments />}>
                <Route index element={<ViewAppointments />}></Route>
                <Route path='doctors' element={<DoctorAll />}></Route>
                <Route path="doctor/:id" element={<DoctorDesc />}></Route>
                <Route path="doctor/:id/checkout" element={<Checkout />}></Route>
                <Route path="doctor/:id/booking" element={<Booking />} />
              </Route>
              <Route path="Message" element={<Message />}>
                <Route index element={<MessageRooms />}></Route>
                <Route path=":id" element={<Discussion />}></Route>
              </Route>
              <Route path="profile" element={<Profile />}></Route>
              <Route path="profile/editpassword" element={<EditPassword />}></Route>

            </Route>




            {/* the admin pannel routes */}
            <Route path="/pannel" element={<AdminHomeTemp />}>
              <Route index element={<Home />}></Route>
              <Route path='post' element={<Postsingle />}></Route>
              <Route path="add-post" element={<AddPost />}></Route>
              <Route path="appointments" element={<Appointments />}>
                <Route index element={<ViewAppointments />}></Route>
              </Route>
              <Route path="Messages" element={<Message />}>
                <Route index element={<MessageRooms />}></Route>
                <Route path=":id" element={<Discussion />}></Route>
              </Route>
              <Route path="users" element={<AdminUsers />}>
                <Route path='doctors' element={<AdminDoctors />}></Route>
                <Route path="mothers" element={<AdminMothers />}></Route>
              </Route>

            </Route>





            {/* the starter routes */}
            <Route path="User" element={<Temp />}>
              <Route index element={<Discission />}></Route>
              <Route path="sign-up-mother" element={<Mother />}></Route>
              <Route path="sign-up-pedetricain" element={<Doctor />}></Route>
              <Route path="sign-in" element={<SignIn />}></Route>
              <Route path='verification' element={<Waitingvarification />}></Route>
              <Route path='resetpassword' element={<ResetPassword />}></Route>
              {/* <Route path="newpassword" element={<NewPassword/>}></Route> */}
            </Route>

          </Routes>
        </BrowserRouter>

      </div>
    </>
  )

}

export default App