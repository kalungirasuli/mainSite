import React, { useState } from 'react';
import { styles, Input } from "../microcomponents/textComponents";
import HeaderLogo from "../microcomponents/HeaderLogo";
import RoundedButton from "../microcomponents/RoundedButton";
import { buttonStyle, Alt } from "../microcomponents/textComponents";
import { useNavigate } from 'react-router-dom';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    };

    // Function for creating a new user or registering a new user with email and password
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setEmail('')
            setPassword('')
            console.log('User registered successfully:', userCredential.user);
            // Navigate to a different page after successful registration
            navigate('/User/choose_user_role');
        } catch (error) {
            console.error('Error registering user:', error.message);
           
        }
    };

    return (
        <>
            <div className={`${styles}`}>
                <HeaderLogo text='Welcome to Neonates, sign-up' head='Neonates' />
                <form onSubmit={handleSubmit}>
                    <Input type='text' ids='email' for='email' label='Email address' name='email' placeholder='Enter email address' onChange={handleChange} value={email} classes='bg-white' />
                    <Input type='password' ids='Password' for='password' label='Password' name='password' placeholder='Enter password' onChange={handleChange} value={password} classes='bg-white' />
                    <div className={`${buttonStyle}`}>
                        <RoundedButton text='Sign-Up' onClick={handleSubmit} />
                        <Alt endText='Forgot password' />
                        <Alt highlightText='Sign In ' endText='Already have an account ' link='/User/sign-up' />
                    </div>
                </form>
            </div>
        </>
    );
}
