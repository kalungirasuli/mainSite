import React, { useState } from 'react';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import HeadWithBack from "../microcomponents/HeadWithBack";
import { Input } from "../microcomponents/textComponents";
import { Button3 } from "../microcomponents/RoundedButton";
import { useSelector } from 'react-redux';
import { Alt } from '../microcomponents/textComponents';

export default function EditPassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const userEmail = useSelector((state) => state.auth.email); 
    const user = useSelector((state) => state.auth.super); 
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        console.log(userEmail)
        console.log(user)

        if (newPassword !== confirmPassword) {
            setError('New password and confirm password do not match');
            return;
        }

    
        if (userEmail) {
            const credential = EmailAuthProvider.credential(
                userEmail,
                currentPassword
            );

            try {
                // await reauthenticateWithCredential(user, credential);
                await updatePassword(user, newPassword);
                alert('Password updated successfully');
            } catch (err) {
                setError('Failed to update password: ' + err.message);
            }
        } else {
            setError('No user is signed in');
        }
    };

    return (
        <>
            <HeadWithBack heading="Edit Password" />
            <div className="p-10">
                <form onSubmit={handlePasswordChange} className="flex flex-col w-[300px] m-auto pt-[20px] md:w-[450px]">
                    <Input 
                        label="Current Password" 
                        type="password" 
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <Input 
                        label="New Password" 
                        type="password" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Input 
                        label="Confirm Password" 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                    <div className="w-full pt-5">
                        <Button3 text="Save" bg='bg-blue text-white' onClick={handlePasswordChange}/>
                    </div>
                    <Alt highlightText='Email' endText='verification  instead' link='/resetpassword' />
                </form>
               
            </div>
        </>
    );
}
