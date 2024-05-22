import React, { useState } from 'react';
import { styles, Input } from "../microcomponents/textComponents";
import HeaderLogo from "../microcomponents/HeaderLogo";
import RoundedButton from "../microcomponents/RoundedButton";
import { buttonStyle, Alt } from "../microcomponents/textComponents";
import { auth, db } from '../../firebase/config'; // Import the Firebase auth and Firestore instances
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

export default function Mother() {
    const [formData, setFormData] = useState({
        firstName: '',
        secondName: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Create the user account with email and password
            const userCredential = await auth.createUserWithEmailAndPassword(formData.email, formData.password);
            
            // Access the user data
            const user = userCredential.user;

            // Send email verification
            await user.sendEmailVerification();

            // Store additional user data in Firestore
            await addDoc(collection(db, 'mothers'), {
                uid: user.uid,
                firstName: formData.firstName,
                secondName: formData.secondName,
                email: formData.email
            });

            // Redirect or navigate to the verification page
            navigate('/User/verification'); 
            
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <div className={`${styles}`}>
                <HeaderLogo text='Welcome to Neonates, sign-up' head='Mothers' />
                <form onSubmit={handleSubmit}>
                    {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display the error message */}
                    
                    <Input
                        type='text'
                        id='firstname'
                        for='firstname'
                        label='First Name'
                        name='firstName'
                        placeholder='Enter first name'
                        ids='firstname'
                        classes='bg-white'
                        onChange={handleChange}
                        value={formData.firstName}
                    />
                    <Input
                        type='text'
                        id='secondname'
                        for='secondname'
                        label='Second Name'
                        name='secondName'
                        placeholder='Enter second name'
                        ids='secondname'
                        classes='bg-white'
                        onChange={handleChange}
                        value={formData.secondName}
                    />
                    <Input
                        type='text'
                        id='email'
                        for='email'
                        label='Email address'
                        name='email'
                        placeholder='Enter email address'
                        ids='email'
                        classes='bg-white'
                        onChange={handleChange}
                        value={formData.email}
                    />
                    <Input
                        type='password'
                        id='password'
                        for='password'
                        label='Password'
                        name='password'
                        placeholder='Enter password'
                        ids='password'
                        classes='bg-white'
                        onChange={handleChange}
                        value={formData.password}
                    />
                    <div className={`${buttonStyle}`}>
                        <RoundedButton text='   CONTINUE' type='submit' />
                        <Alt highlightText='Sign-in' endText='instead' link='/User/sign-in' />
                    </div>
                </form>
            </div>
        </>
    );
}
