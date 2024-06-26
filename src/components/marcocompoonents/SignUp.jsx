import React, { useState } from 'react';
import { styles, Input } from "../microcomponents/textComponents";
import HeaderLogo from "../microcomponents/HeaderLogo";
import RoundedButton from "../microcomponents/RoundedButton";
import { buttonStyle, Alt } from "../microcomponents/textComponents";
import { useNavigate } from 'react-router-dom';
import { auth} from "../../firebase/config"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Loading } from '../microcomponents/textComponents';
import Popup from '../microcomponents/Pop';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const[err,setErr]=useState(false);
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
       setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setLoading(false);
            navigate('/User/choose_user_role'); 
        } catch (error) {
            console.error('Error registering user:', error.message);
            setErrorMessage(error.message);
            setErr(true); // Display the error message
        }
    };

    return (
        <>
          {
            loading?<Loading/>:(
                <div className={`${styles}`}>
                <HeaderLogo text='Welcome to Paedlyfe, sign-up' head='Paedlyfe' />
                <form onSubmit={handleSubmit}>
                    {error && <p className='text-red-500 text-[15px]'>{error}</p>} {/* Display the error message */}
                    {err && <Popup message={'Sign-up failed user already exists'}/>} {/* Display the error message popup */}
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
            )
          }
        </>
    );
}
