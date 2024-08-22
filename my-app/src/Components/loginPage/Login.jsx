import React from 'react';
import logo from '../../assets/logo.png';
import './login.css';
import { NavLink } from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import { TbPassword } from "react-icons/tb";

const Login = () => {
  return (
    <>
      <header className='navbar'>
        <img src={logo} alt="Company logo" className="logo" />
      </header>
      <div className='login'>
        <div className="loginForm">
          <div className='logoForm'>
            <img src={logo} alt="Company logo" className="logo" />
          </div>
          <div className='input-field'>
            <CiUser className="input-icon" />
            <input type="text" placeholder='Username' aria-label="Username" />
          </div>
          <div className='input-field'>
            <TbPassword className="input-icon" />
            <input type="password" placeholder='Password' aria-label="Password" />
          </div>
          <div>
            <NavLink 
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} 
              to="/dashboard"
            >
              <button className='login-button'>Log In</button>
            </NavLink>
          </div>
        </div>
      </div>
      <footer className='footer'>
        <div className='footer-links'>
          <a href="/" className="footer-link">© Supercharged by SuiteCRM</a>
          <a href="/" className="footer-link">© Powered By SugarCRM</a>
        </div>
      </footer>
    </>
  );
}

export default Login;
