import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; 

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/">About</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
