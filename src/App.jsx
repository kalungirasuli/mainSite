import Pageload from "./components/microcomponents/Pageload"
import { Routes,Route,BrowserRouter} from "react-router-dom"
import HomeTemp from "./components/marcocompoonents/HomeTemp"
import Temp from "./components/marcocompoonents/Temp"
import Discission from "./components/marcocompoonents/Discission"
import Mother from "./components/marcocompoonents/mother"
import Doctor from "./components/marcocompoonents/doctors"

import Waitingvarification from "./components/marcocompoonents/Waitingvarification"
import SignIn from "./components/marcocompoonents/Signin"
import SignUp from "./components/marcocompoonents/SignUp"

function App() {
  
  return (
    <>
    <div className="div  ">
    <Pageload />
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeTemp/>}></Route>
      <Route path="User" element={<Temp/>}>
              <Route path="choose_user_role"  element={<Discission/>}></Route>
              <Route path="sign-up-mother" element={<Mother/>}></Route>
              <Route path="sign-up-pedetricain" element={<Doctor/>}></Route>
              <Route path="sign-in" element={<SignIn/>}></Route>
              <Route path="sign-up" element={<SignUp/>}></Route>
              <Route path='verification' element={<Waitingvarification/>}></Route>
      </Route>
      
    </Routes>
    </BrowserRouter>
    
    </div> 
    </>
  )
   
}

export default App
