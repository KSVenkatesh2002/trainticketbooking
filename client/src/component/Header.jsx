import React, { Profiler } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/Header.module.css'

const profileLink = 'https://th.bing.com/th/id/OIP.vdD39cB3cym2j2UDFvjRXgAAAA?rs=1&pid=ImgDetMain';

const Header = () => {
    return (
        <header className={styles.header}>
            <nav>
                <div className={styles.left}>
                    <Link to="/" >
                        <h2>Ticket Booking</h2>
                    </Link>
                </div>
                <div className={styles.right}>
                    <span><Link to="/auth/signup" style={{ textDecoration: 'none' }}>Signup</Link></span>
                    <span><Link to="/auth/login" style={{ textDecoration: 'none' }}>Login</Link></span>
                    <img src={profileLink} alt="profile" />

                </div>

            </nav>
        </header>
    );
};

export default Header;
