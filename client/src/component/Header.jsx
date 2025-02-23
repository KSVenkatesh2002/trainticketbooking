import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrainSubway } from '@fortawesome/free-solid-svg-icons';

const profileLink = 'https://th.bing.com/th/id/OIP.bJpr9jpclIkXQT-hkkb1KQHaHa?w=184&h=184&c=7&r=0&o=5&dpr=1.3&pid=1.7';

const Header = () => {
    const { currentUser } = useSelector((state) => state.user);
    const location = useLocation();
    const [authStyle, setAuthStyle] = useState(true);

    useEffect(() => {
        setAuthStyle(!location.pathname.includes('auth'));
    }, [location.pathname]);

    return (
        <header className="min-h-[60px] h-[8vh]  flex items-center px-5">
            <nav className="flex justify-between items-center w-full h-full">
                <div className="font-bold text-2xl flex items-center space-x-2">
                    <Link to="/" className="flex items-center space-x-1 text-black">
                        <FontAwesomeIcon className="cursor-pointer" icon={faTrainSubway} />
                        <h2 className="inline">Ticket Booking</h2>
                    </Link>
                </div>
                <div className="flex items-center space-x-6 text-lg font-medium">
                    <Link to="/" className="hover:text-gray-200 transition">Home</Link>
                    <Link to="/about" className="hover:text-gray-200 transition">About</Link>
                    {!currentUser ? (
                        authStyle && (
                            <Link to="/auth/signup" className="hover:text-gray-200 transition">Signup</Link>
                        )
                    ) : (
                        <Link to="/profile" className="h-10 w-10 rounded-full overflow-hidden">
                            <img className="h-full w-full object-cover rounded-full" 
                                src={currentUser.photoURL || profileLink} alt="profile" />
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
