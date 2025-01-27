import React, { Profiler, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../css/Header.module.css'

const profileLink = 'https://th.bing.com/th/id/OIP.vdD39cB3cym2j2UDFvjRXgAAAA?rs=1&pid=ImgDetMain';

const Header = () => {
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
                    <span style={authStyle}><Link to="/auth/signup" >Signup</Link></span>
                    <span style={authStyle}><Link to="/auth/login" >Login</Link></span>
                    <img src={profileLink} alt="profile" />

                </div>

            </nav>
        </header>
    );
};

export default Header;
