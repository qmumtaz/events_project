import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import EventItem from './EventItem';
import './Styling/events.css';

const Events = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(''); 

  useEffect(() => {
    async function getEvents() {
      const apiKey = import.meta.env.VITE_EVENTBRITE_API_KEY;
      const orgID = import.meta.env.VITE_ORG_ID;

      try {
        const response = await axios.get(`https://www.eventbriteapi.com/v3/organizations/${orgID}/events/`, {
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        });

        console.log("Full response:", response.data);
        setOrganizations(response.data.events || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError(error);
        setLoading(false);
      }
    }

    getEvents();
  }, []);

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>Error fetching events: {error.message}</p>;
  }

  
  const filteredEvents = organizations.filter(event => {
    if (selectedStatus === 'draft') {
      return event.status === 'draft';
    } else if (selectedStatus === 'upcomingevents') {
      return event.status === 'live' || event.status === 'Upcoming events';
    } 
    else if (selectedStatus === 'cancelevents') {
      return event.status === 'canceled' ;
    }
    else {
      return true; 
    }
  });

  return (
    <div>
      <h2>Upcoming Events</h2>

    
      <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
        <option value="">All Events</option>
        <option value="draft">Draft Events</option>
        <option value="upcomingevents"> Upcoming Events</option>
        <option value="cancelevents">Cancel events</option>
      </select>

    
      {filteredEvents.length > 0 ? (
        <ul className='eventslist'>
          {filteredEvents.map(event => (
            <Link to={`/event/${event.id}`} key={event.id}>
              <li><EventItem events={event} /></li>
            </Link>
          ))}
        </ul>
      ) : (
        <p>No events to show for the selected status.</p>
      )}
    </div>
  );
};

export default Events;
