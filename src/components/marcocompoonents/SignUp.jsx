import React, { useState } from 'react';
import { styles,Input} from "../microcomponents/textComponents"
import HeaderLogo from "../microcomponents/HeaderLogo"
import RoundedButton from "../microcomponents/RoundedButton"
import { buttonStyle,Alt} from "../microcomponents/textComponents"
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Signin(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(email, password)
        } catch (error) {
            console.log(error);
        }
    };

    return(
        <>
         <div className={`${styles}`}>
            <HeaderLogo text='Welcome to Neonates, sign-up' head='Neonates'/>
            <form onSubmit={handleSubmit}>
                <Input type='text' ids='email' for='email' label='Email address' name='email' placeholder='Enter email address' onChange={handleChange} value={email} classes='bg-white' />
                <Input type='password' ids='Password' for='password' label='Password' name='password' placeholder='Enter password' onChange={handleChange} value={password} classes='bg-white' />
               <div className={`${buttonStyle}`}>
                    <RoundedButton text='Sign-Up' type='submit' />
                    <Alt endText='Forgot password' />
                     <Alt highlightText='Sign-up' endText='instead'link= '/User/choose_user_role' />
                    
               </div>
            </form>
         </div>
        </>
    )
}
