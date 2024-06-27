
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
import { Loading } from '../microcomponents/textComponents';
import Popup from '../microcomponents/Pop';
export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        try {
           
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

        //  if (user && user.emailVerified){
            const userType = await determineUserType(user.uid);

            dispatch(setUser({ user: user.uid, email: user.email, role: userType, super: user }));
            setLoading(false);
            console.log('User logged in:', user.uid);

            if (userType === 'admin') {
                navigate('/pannel');
            } else {
                navigate('/');
            // }
         }
        } catch (error) {
            setLoading(false);
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
        <>
        {
            loading?<Loading/>:(
                
                <div className={`lg:bg-white lg:grid lg:grid-cols-2 lg:gap-5 lg:shadow-xl lg:rounded-[20px] lg:p-[50px] lg:w-[700px] lg:h-[max-content] lg:m-auto lg:mt-[10%] xl:mt-5  `}>
                <HeaderLogo  head='Paedlyfe' />
           
               <form onSubmit={handleSubmit}>
                <p className='text-center text-[20px] text-greytextdark'>
                Welcome to Paedlyfe, sign-In
                </p>
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
            )
        }
        </>
    );
}