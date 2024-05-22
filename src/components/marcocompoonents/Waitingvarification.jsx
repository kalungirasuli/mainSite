import { styles, buttonStyle } from "../microcomponents/textComponents";
import { Button3 } from "../microcomponents/RoundedButton";
import HeaderLogo from "../microcomponents/HeaderLogo";
import { useState, useEffect } from "react";
import { auth, db } from '../../firebase/config'; 
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export default function WaitingVerification() {
    const message = {
        mother: "To ensure your account's security and enable us to communicate effectively, please verify your email address. Check your inbox for our verification email. If not received, check spam.",
        doctor: "Your documents are currently under verification. We appreciate your patience and we will respond by sending you an email soon. Thank you"
    };
    const buttontext = {
        mother: 'Resend message',
        doctor: 'Cancel submission'
    };
    const altbuttontext = {
        out: 'Sign out of this account',
        in: 'Sign in with another account'
    };
    
    const [user, setUser] = useState('');
    const [color, setColor] = useState('');
    const [bg, setBg] = useState('');
    const [text, setText] = useState('');
    const navigate = useNavigate();

    const fetchUserRole = async (uid) => {
        try {
            const userDoc = await getDoc(doc(db, 'users', uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                return userData.role; 
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching user role:", error);
        }
        return null;
    };

    const checkUserRole = async () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const role = await fetchUserRole(currentUser.uid);
            if (role === 'doctor') {
                setUser(role);
                setColor('text-white');
                setText(buttontext.doctor);
                setBg('bg-redlight');
            } else {
                setUser('mother');
                setColor('text-blue');
                setText(buttontext.mother);
                setBg('bg-bluebutton');
            }
        }
    };

    useEffect(() => {
        checkUserRole();
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/User/sign-in');
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };



    return (
        <>
            <div className={`${styles}`}>
                <HeaderLogo head='Neonates' />
                <div className={`${buttonStyle} bg-white rounded-[10px] shadow-lg p-5 mt-5`}>
                    <p className="text-[13px] text-greytextdark md:text-[20px]">
                        {user === 'mother' ? message.mother : message.doctor}
                    </p>
                    <Button3 width='w-[60%] mt-5' color={color} bg={bg} text={text} />
                </div>
                {user === 'doctor' ? (
                    <div className={`${buttonStyle} mt-5`}>
                        <Button3 width='w-full' color='text-blue' bg='bg-bluebutton' text={altbuttontext.in} />
                        <p className="text-center text-greytextdark text-[15] my-2">or</p>
                        <Button3 width='w-full' color='text-white' bg='bg-blue' text={altbuttontext.out} onClick={handleSignOut} />
                    </div>
                ) : (
                    <div className="progress-bar flex flex-row absolute bottom-[100px] left-0 right-0 w-[70%] m-auto lg:w-[50%] bg-greytextfade xl:w-[40%]">
                        <hr className='bg-blue h-2 w-[20%]' />
                    </div>
                )}
            </div>
        </>
    );
}
