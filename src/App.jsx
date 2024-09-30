import Header from './Components/Header'
import Navbar from './Components/Navbar'
import Events from './Components/Events'
import './App.css'
import {  Router, Routes, Route } from 'react-router-dom';
import Homepage from './Components/Home';
import CreateEvent from './Components/CreateEvent';


function App() {
  

  return (
    <>
     <Header />
          <Navbar />
          <Routes>
            <Route path="/events" element={<Events />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/createevent" element={<CreateEvent />} />
          </Routes>
    
    </>
  )
}

export default App
