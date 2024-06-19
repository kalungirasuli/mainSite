
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/authSlice';
import { styles, Input } from '../microcomponents/textComponents';
import HeaderLogo from '../microcomponents/HeaderLogo';
import RoundedButton from '../microcomponents/RoundedButton';
import { buttonStyle, Alt } from '../microcomponents/textComponents';
import { db } from '../../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

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

            const userType = await determineUserType(user.uid);

            dispatch(setUser({ user: user.uid, email: user.email, role: userType, super: user }));
            console.log('User logged in:', user.uid);

            if (userType === 'admin') {
                navigate('/pannel');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Error logging in user:', error.message);
        }
    };

    const determineUserType = async (uid) => {
        try {
            // Check if the user is an admin
            const adminQuery = query(collection(db, 'admin'), where('uid', '==', uid));
            const adminSnapshot = await getDocs(adminQuery);

            if (!adminSnapshot.empty) {
                return 'admin';
            }

            // Check if the user is a doctor
            const doctorQuery = query(collection(db, 'doctors'), where('uid', '==', uid));
            const doctorSnapshot = await getDocs(doctorQuery);

            if (!doctorSnapshot.empty) {
                return 'doctor';
            }

            // Check if the user is a mother
            const motherQuery = query(collection(db, 'mothers'), where('uid', '==', uid));
            const motherSnapshot = await getDocs(motherQuery);

            if (!motherSnapshot.empty) {
                return 'mother';
            }

            // Default user type if no match is found
            return 'unknown';
        } catch (error) {
            console.error('Error determining user type: ', error);
            return 'unknown';
        }
    };

    return (
        <div className={`${styles}`}>
            <HeaderLogo text='Welcome to Pedlyfe, sign-In' head='Pedlyfe' />
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
                    <RoundedButton text='Sign-in' type='submit' onClick={handleSubmit} />
                    <Alt endText='Forgot password' link='/User/resetpassword' />
                    <Alt highlightText='Sign-up' endText='instead' link='/User' />
                </div>
            </form>
        </div>
    );
}