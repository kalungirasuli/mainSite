import React, { useState, useEffect } from 'react';
import { Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Pageload from '../microcomponents/Pageload';

const ProtectedRoute = ({ allowedRoles, redirectPath = '/User/sign-in' }) => {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        const determineUserType = async () => {
            if (user) {
                try {
                    const uid = user;
                    const adminQuery = query(collection(db, 'admin'), where('uid', '==', uid));
                    const adminSnapshot = await getDocs(adminQuery);
                    
                    if (!adminSnapshot.empty) {
                        setUserType('admin');
                        setLoading(false);
                        navigate('/pannel');
                        return;
                    }

                    const doctorQuery = query(collection(db, 'doctors'), where('uid', '==', uid));
                    const doctorSnapshot = await getDocs(doctorQuery);

                    if (!doctorSnapshot.empty) {
                        setUserType('doctor');
                        setLoading(false);
                        navigate('/');
                        return;
                    }

                    const motherQuery = query(collection(db, 'mothers'), where('uid', '==', uid));
                    const motherSnapshot = await getDocs(motherQuery);

                    if (!motherSnapshot.empty) {
                        setUserType('mother');
                        setLoading(false);
                        navigate('/');
                        return;
                    }

                    setUserType('unknown');
                } catch (error) {
                    console.error('Error determining user type: ', error);
                    setUserType('unknown');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        determineUserType();
    }, [user, navigate]);

    if (loading) {
        return <Pageload />;
    }

    if (!user) {
        return <Navigate to={redirectPath} />;
    }

  

    return <Outlet />;
};

export default ProtectedRoute;
