import  { useState } from 'react';
import { styles, Input, File } from "../microcomponents/textComponents";
import HeaderLogo from "../microcomponents/HeaderLogo";
import RoundedButton from "../microcomponents/RoundedButton";
import { buttonStyle, Alt } from "../microcomponents/textComponents";
import { auth, db } from '../../firebase/config'; // Import Firebase auth and Firestore instances
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/authSlice';

export default function Doctor() {
    const [formData, setFormData] = useState({
        firstName: '',
        secondName: '',
        email: '',
        license: null,
        certificate: null
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const storage = getStorage(); 
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData(prevData => ({
                ...prevData,
                [name]: files[0]
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        const { firstName, secondName, email, license, certificate,password } = formData;
       

        try {
           // Create the user account with email and password
           const userCredential = await createUserWithEmailAndPassword(auth,email, password);
            
           // Access the user data
           const user = userCredential.user;
           await sendEmailVerification(user);
           
            const licenseRef = ref(storage, `licenses/${user.uid}/${license.name}`);
            const certificateRef = ref(storage, `certificates/${user.uid}/${certificate.name}`);

            // Upload files to Firebase Storage
            await uploadBytes(licenseRef, license);
            await uploadBytes(certificateRef, certificate);

            const licenseURL = await getDownloadURL(licenseRef);
            const certificateURL = await getDownloadURL(certificateRef);

            // Add data to Firestore
            await addDoc(collection(db, "doctors"), {
                uid: user.uid,
                firstName,
                secondName,
                email,
                licenseURL,
                certificateURL
            });

            console.log('Data submitted successfully');

            // Dispatch user data to Redux store
        // Dispatch user data to Redux store
        dispatch(setUser({
            user: {
              uid: user.uid,
              email: user.email,
              firstName,
              secondName,

            },
            role: 'doctor',
          }));
            navigate('/User/verification'); 
            // Redirect to the desired route after successful submission
        } catch (error) {
            console.error('Error submitting data:', error.message);
            setError(error.message);
        }
    };

    return (
        <>
            <div className={`${styles}`}>
                <HeaderLogo text='Welcome to Neonates, sign-up' head='Pediatricians' />
                <form onSubmit={handleSubmit}>
                    {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
                    <Input
                        type='text'
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
                    <File
                        type='file'
                        for='license'
                        label='Medical License'
                        name='license'
                        ids='license'
                        classes='bg-white'
                        onChange={handleChange}
                    />
                    <File
                        type='file'
                        for='certificate'
                        label='Academic Qualifications'
                        name='certificate'
                        ids='certificate'
                        classes='bg-white'
                        onChange={handleChange}
                    />
                    <div className={`${buttonStyle}`}>
                        <RoundedButton text='Sign-up' type='Submit' onClick={handleSubmit}  />
                        <Alt highlightText='Sign-in' endText='instead' link='/User/sign-in' />
                    </div>
                </form>
            </div>
        </>
    );
}
