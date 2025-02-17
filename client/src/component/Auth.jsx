import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { failure } from '../redux/user/userSlice';

const Auth = () => {
    const location = useLocation();
    const types = location.pathname.split('/')[location.pathname.split('/').length-1]// Get URL parameter
    const [showLogin, setShowLogin] = useState(false); // State to track current page
    const dispatch = useDispatch(); // Dispatch function to dispatch actions
    // Update the state based on the current URL parameter
    useEffect(() => {
        dispatch(failure('')); // Clear any error messages
        if (types === 'login') {
            setShowLogin(true);
        } else {
            setShowLogin(false);
        }
    }, [types]);

    // Function to handle page change and update the URL
    const handlePageChange = (page) => {
        if (page === 'login') {
            setShowLogin(true);
            //navigate('/auth/login'); // Navigate to login page
        } else {
            setShowLogin(false);
            //navigate('/auth/signup'); // Navigate to signup page
        }
    };

    return (
        <div className="h-[calc(100vh-8vh)] flex flex-col items-center bg-gradient-to-br from-[rgba(245,227,190,0.5)] via-[rgba(233,182,139,0.55)] via-[rgba(228,182,140,0.55)] via-[rgba(184,148,114,0.55)] to-[rgba(254,188,116,0.55)]">
            <header className="w-full h-[11vh] min-h-[70px] rounded-b-[50px] bg-gradient-to-br from-[rgba(245,227,190,0.5)] via-[rgba(233,182,139,0.55)] to-[rgba(254,188,116,0.55)] flex justify-evenly items-end">
                <Link to='/auth/signup'>
                    <h2 
                        onClick={() => handlePageChange('signup')} 
                        className={`font-semibold mb-2 px-4 py-2 rounded-md cursor-pointer transition-all duration-300 
                        ${showLogin ? 'text-sm' : 'text-lg border-b-4 border-black'}`}
                    > 
                        Sign Up
                    </h2>
                </Link>
                <Link to='/auth/login'>
                    <h2 
                        onClick={() => handlePageChange('login')} 
                        className={`font-semibold mb-2 px-4 py-2 rounded-md cursor-pointer transition-all duration-300 
                        ${showLogin ? 'border-b-4 border-black text-lg' : 'text-sm'}`}
                    >
                        Log in
                    </h2>
                </Link>
            </header>
            <div className="relative min-w-screen max-w-md h-screen overflow-hidden mt-8">
                
                <div 
                    className={`absolute inset-0 w-full transition-transform duration-500 ease-in-out ${showLogin ? '-translate-x-full' : 'translate-x-0'}`}
                >
                    <Outlet/>{/*<Signup/> */}
                </div>
                <div 
                    className={`absolute inset-0 w-full transition-transform duration-500 ease-in-out ${showLogin ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default Auth;
