import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomeTemp from "./components/marcocompoonents/HomeTemp";
import Temp from "./components/marcocompoonents/Temp";
import Discission from "./components/marcocompoonents/Discission";
import Mother from "./components/marcocompoonents/mother";
import Doctor from "./components/marcocompoonents/doctors";
import Waitingvarification from "./components/marcocompoonents/Waitingvarification";
import Home from "./components/marcocompoonents/Home";
import SignIn from "./components/marcocompoonents/Signin";
import Appointments from "./components/marcocompoonents/Appointments";
import DoctorAll from "./components/marcocompoonents/DoctorAll";
import DoctorDesc from "./components/marcocompoonents/DoctorDesc";
import Booking from "./components/marcocompoonents/Booking";
import Checkout from "./components/marcocompoonents/Checkout";
import Message from "./components/marcocompoonents/Messages";
import Discussion from "./components/marcocompoonents/Discussion";
import MessageRooms from "./components/marcocompoonents/MessageRooms";
import AddPost from "./components/marcocompoonents/AddPost";
import Postsingle from "./components/marcocompoonents/Postsingle";
import Profile from "./components/marcocompoonents/Profile";
import EditPassword from "./components/marcocompoonents/EditPassword";
import ResetPassword from "./components/marcocompoonents/ResetPassword";
import ViewAppointments from "./components/marcocompoonents/ViewAppointments";
import AdminHomeTemp from "./components/marcocompoonents/AdminHomeTemp";
import AdminUsers from "./components/marcocompoonents/AdminUser";
import AdminDoctors from "./components/marcocompoonents/AdminDoctors";
import AdminMothers from "./components/marcocompoonents/AdminMothers";
import ProtectedRoute from "./components/microcomponents/ProtectedRoutes";
// import ProtectedRoute from "./components/microcomponents/ProtectedRoute";

function App() {
  return (
    <div className="div bg-smoke">
      <BrowserRouter>
        <Routes>
          {/* General Routes */}
          <Route element={<ProtectedRoute allowedRoles={['doctor', 'mother']} />}>
            <Route path="/" element={<HomeTemp />}>
              <Route index element={<Home />} />
              <Route path="post/:id" element={<Postsingle />} />
              <Route path="add-post" element={<AddPost />} />
              <Route path="appointment" element={<Appointments />}>
                <Route index element={<ViewAppointments />} />
                <Route path="doctors" element={<DoctorAll />} />
                <Route path="doctor/:id" element={<DoctorDesc />} />
                <Route path="doctor/:id/checkout" element={<Checkout />} />
                <Route path="doctor/:id/booking" element={<Booking />} />
              </Route>
              <Route path="Message" element={<Message />}>
                <Route index element={<MessageRooms />} />
                <Route path=":id" element={<Discussion />} />
              </Route>
              <Route path="profile" element={<Profile />} />
              <Route path="profile/editpassword" element={<EditPassword />} />
            </Route>
          </Route>

          {/* Admin Panel Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/pannel" element={<AdminHomeTemp />}>
              <Route index element={<Home />} />
              <Route path="post" element={<Postsingle />} />
              <Route path="add-post" element={<AddPost />} />
              <Route path="appointments" element={<Appointments />}>
                <Route index element={<ViewAppointments />} />
              </Route>
              <Route path="Messages" element={<Message />}>
                <Route index element={<MessageRooms />} />
                <Route path=":id" element={<Discussion />} />
              </Route>
              <Route path="users" element={<AdminUsers />}>
                <Route path="doctors" element={<AdminDoctors />} />
                <Route path="mothers" element={<AdminMothers />} />
              </Route>
            </Route>
          </Route>

          {/* Starter Routes */}
          <Route path="User" element={<Temp />}>
            <Route index element={<Discission />} />
            <Route path="sign-up-mother" element={<Mother />} />
            <Route path="sign-up-pedetricain" element={<Doctor />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="verification" element={<Waitingvarification />} />
            <Route path="resetpassword" element={<ResetPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
