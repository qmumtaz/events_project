// Homepage.js
import React from 'react';
 

const Homepage = () => {
 
  const upcomingEvents = [
    { id: 1, title: 'Music Festival', date: 'October 15, 2024', location: 'Central Park' },
    { id: 2, title: 'Tech Conference', date: 'November 10, 2024', location: 'Convention Center' },
    { id: 3, title: 'Art Exhibition', date: 'December 5, 2024', location: 'City Gallery' },
  ];

  return (
    <div >
      <header >
        <h1>Welcome to the Events Platform</h1>
        <p>Your one-stop solution for discovering amazing events happening near you!</p>
      </header>

      <section className="upcoming-events">
        <h2>Upcoming Events</h2>
        <ul>
          {upcomingEvents.map(event => (
            <li key={event.id} className="event-item">
              <h3>{event.title}</h3>
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="features">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Easy to navigate and discover events.</li>
          <li>Personalized recommendations based on your interests.</li>
          <li>Secure and hassle-free ticket purchasing.</li>
        </ul>
      </section>
    </div>
  );
};

export default Homepage;
