import React, { Profiler } from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.module.css'

const profileLink='https://th.bing.com/th/id/OIP.vdD39cB3cym2j2UDFvjRXgAAAA?rs=1&pid=ImgDetMain';

const Header = () => {
  return (
    <header>
      <nav>
        <div className="left">
          <Link to="/">
            <h2>Ticket Booking</h2>
          </Link>
        </div>
        <div className="right">
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <div className='profile'>
          <img src={profileLink} alt="profile"/>
        </div>
        </div>
        
      </nav>
    </header>
  );
};

export default Header;
