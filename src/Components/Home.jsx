import React from 'react';
import "./Styling/home.css" 
import eventImg from "../Images/undraw_Date_picker_re_r0p8.png"

const Homepage = () => {

  return (
    <div >
      <header >
        <h1>Welcome to the Eventures</h1>
        <div class="intro">
      <div class="intro-content">
    <h1>Discover, Manage, and Join Amazing Events Tailored Just for You</h1>
    <p>
    Eventures brings together users and event managers to create seamless experiences. 
    Our platform supports easy ticketing, 
    managed by dedicated staff, with a personalized event calendar for you to explore.
    </p>
    <a href="/events  " class="join-button">Want to check out some events click here</a>
  </div>
  <div class="intro-image">
    <img src={eventImg} />
  </div>
</div>
      </header>

      <div class="info-section">
  <div class="info-cards">
    <div class="info-card">
      <h3>Ticketing done easy</h3>
      <p>You can find and sign up for the events do whatever you want and easily accessible.</p>
    </div>
    <div class="info-card">    
      <h3>Everything can be managed by our event staff</h3>
      <p>We’re proud to be different from other ticket agents. Our event staff are always on the board.</p>
    </div>
    <div class="info-card">   
      <h3>Personal Event Calendar </h3>
      <p>Access a calendar view of upcoming events, making it easy to track and plan your activities.</p>
    </div>

  </div>
  <a href="/signup" class="read-more">Join us now</a>
</div>


    </div>
  );
};

export default Homepage;
