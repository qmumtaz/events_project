import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth'; 
import { auth } from '../../firebase'; 
import './styles.css'; 

const Navbar = ({ user, role }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth); 
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <nav>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/">About</Link></li>

        {}
        {user ? (
          <>  
            {role === 'staff' && (
              <>
                <li><Link to="/staff-dashboard">Staff Dashboard</Link></li>
                <li><Link to="/manage-events">Manage Events</Link></li>
              </>
            )}

          
            {role === 'member' && (
              <>
                <li><Link to="/member-dashboard">Member Dashboard</Link></li>
                <li><Link to="/browse-events">Browse Events</Link></li>
              </>
            )}

            <li><Link to="/profile">Profile</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li> 
          </>
        ) : (
        
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
