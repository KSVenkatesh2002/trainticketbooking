import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const BookingRouter = () => {
    const location = useLocation();
    const position = location.pathname.split('/').pop(); // Extract last part of URL

    return (
        <div className='w-full min-h-screen'>
            {/* Progress Navigation */}
            <div className='flex justify-center w-full items-center my-4'>
                <span className={`bg-orange-500 rounded-full w-10 h-10 flex items-center justify-center border`}>
                    1
                </span>
                <hr className='w-1/2 max-w-100 h-1 border-orange-400 rounded-lg bg-orange-400' />
                <span className={`${position === 'payment' ? 'bg-orange-500' : 'bg-orange-300'} rounded-full w-10 h-10 flex items-center justify-center border`}>
                    2
                </span>
            </div>

            {/* Render Nested Routes */}
            <Outlet />
        </div>
    );
};

export default BookingRouter;
