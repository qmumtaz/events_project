import React, { useState, useEffect } from 'react'; 
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import Events from './Components/Events';
import './App.css';
import {   Routes, Route } from 'react-router-dom'; 
import Homepage from './Components/Home';
import CreateEvent from './Components/CreateEvent';
import SingularEvent from './Components/SingularEvent';
import Order from './Components/Order';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '.././firebase';
import Profile from './Components/Profile';

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(''); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
      
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRole(docSnap.data().role); 
        }
      } else {
        setRole('');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
   <>
   <Header />
      <Navbar user={user} role={role} /> 
      <Routes>
        <Route path="/events" element={<Events />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/createevent" element={<CreateEvent />} />
        <Route path="/event/:eventId" element={<SingularEvent />} />
        <Route path="/event/:eventId/order" element={<Order />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
   </>
      
   
  );
}

export default App;
