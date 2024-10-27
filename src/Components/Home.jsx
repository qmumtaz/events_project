import React from 'react';
import { Carousel } from 'react-bootstrap';
import "./Styling/home.css" 
import eventImg from "../Images/undraw_Date_picker_re_r0p8.png"

const Homepage = () => {

  return (
    <div >
      <header >
        <h1>Welcome to the Eventures</h1>
        <div class="intro">
      <div class="intro-content">
    <h1>The people platform managed by you</h1>
    <p>
     Lorem ipsum dolor, sit amet consectetur adipisicing elit. In sed error, 
     perspiciatis quaerat earum soluta sequi eos quae, 
     dolor totam laborum necessitatibus deserunt optio molestias omnis voluptatum? Rem, quas labore!
    </p>
    <a href="/signup" class="join-button">Join Now</a>
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
      <p>You can find and sign up for the events you want</p>
    </div>
    <div class="info-card">    
      <h3>Everything can be managed by our event staff</h3>
      <p>We’re proud to be different from other ticket agents. Our event staff are always on the board.</p>
    </div>
    <div class="info-card">   
      <h3>Made by fans like you</h3>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste, assumenda.</p>
    </div>

  </div>
  <a href="#" class="read-more">READ MORE ABOUT US</a>
</div>


    </div>
  );
};

export default Homepage;
