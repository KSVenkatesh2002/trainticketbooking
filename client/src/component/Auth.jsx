import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

const Auth = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700">
            <div className="w-full max-w-md p-6 bg-gray-800 rounded-xl shadow-lg relative">
                {/* Navigation Tabs */}
                

                {/* Transition Container */}
                <div className="relative w-full overflow-hidden h-full">
                    
                        <Outlet />
                    
                </div>
            </div>
        </div>
    );
};

export default Auth;
