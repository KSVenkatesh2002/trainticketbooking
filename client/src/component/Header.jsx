import React, { Profiler } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/Header.module.css'

const profileLink='https://th.bing.com/th/id/OIP.vdD39cB3cym2j2UDFvjRXgAAAA?rs=1&pid=ImgDetMain';

const Header = () => {
  return (
    <header>
      <nav>
        <div className={styles.left}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h2>Ticket Booking</h2>
          </Link>
        </div>
        <div className={styles.right}>
          <span><Link to="/signup" style={{ textDecoration: 'none' }}>signup</Link> </span>
          <span><Link to="/login" style={{ textDecoration: 'none' }}>Login</Link></span>
          <img src={profileLink} alt="profile" />
          
        </div>
        
      </nav>
    </header>
  );
};

export default Header;
