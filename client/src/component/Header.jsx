import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../css/Header.module.css'
import { useSelector } from 'react-redux';

const profileLink = 'https://th.bing.com/th/id/OIP.bJpr9jpclIkXQT-hkkb1KQHaHa?w=184&h=184&c=7&r=0&o=5&dpr=1.3&pid=1.7';

const Header = () => {
    const { currentUser } = useSelector((state) => state.user)
    const location = useLocation();
    let [authStyle,setAuthStyle] = useState({display: 'block'});
    useEffect(() => {
        const url = location.pathname;
        setAuthStyle(url.includes('auth') ? {display: 'none'} : {display: 'block'})
    }, [location.pathname])
    return (
        <header className={styles.header}>
            <nav>
                <div className={styles.left}>
                    <Link to="/" >
                        <h2>Ticket Booking</h2>
                    </Link>
                </div>
                <div className={styles.right}>
                    <span >
                        <Link to="/" >Home</Link>
                    </span> 
                    <span >
                        <Link to="/about" >About</Link>
                    </span> 
                    {!currentUser 
                    ? <span style={authStyle}>
                        <Link to="/auth/signup" >Signup</Link>
                    </span> 
                    : <span className={styles.profile}>
                        <Link to="/profile">
                            <img src={currentUser.photoURL || profileLink } alt="profile"/> 
                        </Link>
                    </span>}
                    
                    
                    
                </div>
            </nav>
        </header>
    );
};

export default Header;
