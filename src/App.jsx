import Pageload from "./components/microcomponents/Pageload"
import { Routes,Route,BrowserRouter} from "react-router-dom"
import Temp from "./components/marcocompoonents/Temp"
import Discission from "./components/marcocompoonents/Discission"
import Mother from "./components/marcocompoonents/mother"
import Doctor from "./components/marcocompoonents/doctors"
import Signin from "./components/marcocompoonents/Signin"
import Waitingvarification from "./components/marcocompoonents/Waitingvarification"
import SignUp from "./components/marcocompoonents/Signin"
function App() {
  
  return (
    <>
    <div className="div  ">
    <Pageload />
    <BrowserRouter>
    <Routes>
      <Route path="User" element={<Temp/>}>
              <Route path="choose_user_role"  element={<Discission/>}></Route>
              <Route path="sign-up-mother" element={<Mother/>}></Route>
              <Route path="sign-up-pedetricain" element={<Doctor/>}></Route>
              <Route path="sign-in" element={<Signin/>}></Route>
              <Route path="sign-Up" element={<SignUp/>}></Route>
              <Route path='verification' element={<Waitingvarification/>}></Route>
      </Route>
      
    </Routes>
    </BrowserRouter>
    
    </div> 
    </>
  )
   
}

export default App
