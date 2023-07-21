import React, { useState } from 'react';
import Logo from "../assets/logo.jpg";
import { HiOutlineBars3 } from "react-icons/hi2";
import HomeIcon from '@mui/icons-material/Home';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';



import './styles/Navbar.css';

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
    {
      text: 'Home',
      icon: <HomeIcon />,
    },
    {
      text: 'Testimonials',
      icon: <CommentRoundedIcon />,
    },

  ];

  return (
    <nav>
      <div className="nav-logo-container">
        <img src={Logo} alt=''/>
      </div>
      <div className="navbar-links-container">
        <a href="/">Home</a>
        <a href="/">Available Breeds</a>
        <a href="/">Testimonials</a>
        
       
        <button className="primary-button">Login/sign-up</button>
      </div>
      <div className="navbar-menu-container">
            <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
    </div>
      
    </nav>
  );
};

export default Navbar;