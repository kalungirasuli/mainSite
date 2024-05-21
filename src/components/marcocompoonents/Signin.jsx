import { styles ,Input} from "../microcomponents/textComponents"
import HeaderLogo from "../microcomponents/HeaderLogo"
import RoundedButton from "../microcomponents/RoundedButton"
import { buttonStyle ,Alt} from "../microcomponents/textComponents"

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        if (e.target.name === 'email') {
            console.log(email)
            setEmail(e.target.value);
        } else if (e.target.name === 'password') {
            console.log(password)
            setPassword(e.target.value);
        }
    };

    // function for login a user that has already has an account
    const handleSubmit = async (event) => {
        event.preventDefault();
       
    };

    return(
        <>
         <div className={`${styles}`}>
            <HeaderLogo text='Welcome Back to Neonates, sign-In' head='Neonates'/>
            <form onSubmit={handleSubmit(e)}>
            <Input type='text' ids='email' for='email' label='Email address' name='email' placeholder='Enter email address' onChange={handleChange} value={email} classes='bg-white' />
                <Input type='password' ids='Password' for='password' label='Password' name='password' placeholder='Enter password' onChange={handleChange} value={password} classes='bg-white' />
           <div className={`${buttonStyle}`}>
            <RoundedButton text='Sign-in' type='Submit' onClick={()=> handleSubmit()}  />
            <Alt endText='Forgot password' />
             <Alt highlightText='Sign-up' endText='Dont have an account 'link= '/User/sign-in' />
            
           </div>
            </form>
         </div>
        </>
    )
}