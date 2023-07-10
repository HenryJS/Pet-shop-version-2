import React, { useState } from 'react';
import Logo from "../assets/logo.png";
import { HiOutlineBars3 } from "react-icons/hi2";
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import './styles/Navbar.css';

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
    {
      text: 'Home',
      icon: <HomeIcon />,
    },
    {
      text: 'About',
      icon: <InfoIcon />,
    },
    {
      text: 'Testimonials',
      icon: <CommentRoundedIcon />,
    },
    {
      text: 'Contact',
      icon: <PhoneRoundedIcon />,
    },
    {
      text: 'Cart',
      icon: <ShoppingCartRoundedIcon />,
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
        <a href="/">About</a>
        <a href="/">
          <AccountCircleIcon className="navbar-cart-icon" />
        </a>
        <button className="primary-button">Login/sign-up</button>
      </div>
      <div className="navbar-menu-container">
            <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
    </div>
      
    </nav>
  );
};

export default Navbar;
