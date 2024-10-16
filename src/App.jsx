import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import Homepage from './Components/Home';
import Events from './Components/Events';
import CreateEvent from './Components/CreateEvent';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Profile from './Components/Profile';
import SingularEvent from './Components/SingularEvent';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';  
import React, { useEffect, useState } from 'react';
import './app.css';
import Order from './Components/Order';
import PublishEvents from './Components/PublishEvents';
import PublishEventPage from './Components/PublishEventsPage';
import ManagementEvents from './Components/ManagementEvents';
import UpdateEvents from './Components/UpdateEvents';
import Calendar from './Components/Calendar';
import { AuthProvider } from '../AuthContext';

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
        } else {
          console.log("No such document!");
        }
      } else {
        setRole('');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthProvider>
      <Header />
      <Navbar user={user} role={role} />
      <Routes>
         {/* Public routes  */}
        <Route path="/events" element={<Events role={role} />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/event/:eventId" element={<SingularEvent />} />
        <Route path="/event/:eventId/order" element={<Order />} />
        
        {/* Redirect logged-in users away from login/signup */}
        <Route path="/login" element={user ? <Navigate to="/profile" /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/profile" /> : <SignUp />} />
        
        {/* Protected routes */}
        <Route path="/createevent" element={role === 'staff' ? <CreateEvent /> : <Navigate to="/home" />} />
        <Route path="/updateevent/:eventId" element={role === 'staff' ? <UpdateEvents /> : <Navigate to="/manageevents" />} />
        <Route path="/manageevents" element={role === 'staff' ? <ManagementEvents /> : <Navigate to="/home" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/publish" element={role === 'staff' ? <PublishEvents /> : <Navigate to="/home" />} />
        <Route path="/publish/:id" element={role === 'staff' ? <PublishEventPage /> : <Navigate to="/home" />} />
        <Route path="/calendar" element={user ? <Calendar /> : <Navigate to="/login" />} />
        
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
