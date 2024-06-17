import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/authSlice';
import { styles, Input } from '../microcomponents/textComponents';
import HeaderLogo from '../microcomponents/HeaderLogo';
import RoundedButton from '../microcomponents/RoundedButton';
import { buttonStyle, Alt } from '../microcomponents/textComponents';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const auth = getAuth();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            dispatch(setUser({ user: user.uid, email: user.email, role: 'yourRoleHere', super: user })); 
            console.log('User logged in:', user.uid);

            const userAuth = auth.currentUser;
            console.log("The authenticated user is:", userAuth);

            navigate('/');
        } catch (error) {
            console.error('Error logging in user:', error.message);
        }
    };

    return (
        <div className={`${styles}`}>
            <HeaderLogo text='Welcome to Neonates, sign-In' head='Neonates' />
            <form onSubmit={handleSubmit}>
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
                    ids='Password'
                    for='password'
                    label='Password'
                    name='password'
                    placeholder='Enter password'
                    onChange={handleChange}
                    value={password}
                    classes='bg-white'
                />
                <div className={`${buttonStyle}`}>
                    <RoundedButton text='Sign-in' type='submit'  onClick={handleSubmit}/>
                    <Alt endText='Forgot password' link='/User/resetpassword' />
                    <Alt highlightText='Sign-up' endText='instead' link='/User' />
                </div>
            </form>
        </div>
    );
}
