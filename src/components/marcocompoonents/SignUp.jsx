import React, { useState } from 'react';
import { styles, Input } from "../microcomponents/textComponents";
import HeaderLogo from "../microcomponents/HeaderLogo";
import RoundedButton from "../microcomponents/RoundedButton";
import { buttonStyle, Alt } from "../microcomponents/textComponents";
import { useNavigate } from 'react-router-dom';
import { auth} from "../../firebase/config"
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); 

        if (!validateEmail(email)) {
            setError('Invalid email address');
            return;
        }

        if (password.length < 6) {
            setError('Password should be at least 6 characters');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User registered successfully:', userCredential.user);
            navigate('/User/choose_user_role'); 
        } catch (error) {
            console.error('Error registering user:', error.message);
            setError(error.message); // Display the error message
        }
    };

    return (
        <>
            <div className={`${styles}`}>
                <HeaderLogo text='Welcome to Neonates, sign-up' head='Neonates' />
                <form onSubmit={handleSubmit}>
                    {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display the error message */}
                    <Input 
                        type='text' 
                        ids='email' 
                        for='email' 
                        label='Email address' 
                        name='email' 
                        placeholder='Enter email address' 
                        onChange={handleChange} 
                        value={email} 
                        classes='bg-white' 
                    />
                    <Input 
                        type='password' 
                        ids='password' 
                        for='password' 
                        label='Password' 
                        name='password' 
                        placeholder='Enter password' 
                        onChange={handleChange} 
                        value={password} 
                        classes='bg-white' 
                    />
                    <div className={`${buttonStyle}`}>
                        <RoundedButton text='Sign-Up' type='Submit' onClick={handleSubmit} />
                        <Alt endText='Forgot password' />
                        <Alt highlightText='Sign In ' endText='Already have an account ' link='/User/sign-up' />
                    </div>
                </form>
            </div>
        </>
    );
}
