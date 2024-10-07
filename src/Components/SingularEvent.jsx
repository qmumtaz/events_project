import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Order from './Order';

const SingularEvent = () => {
  const { eventId } = useParams(); 
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_EVENTBRITE_API_KEY;

  
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `https://www.eventbriteapi.com/v3/events/${eventId}/`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
        setEvent(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching event:', err);
        setError('Failed to load event details.');
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, apiKey]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div style={{ padding: '20px' }}>
      <h1>{event.name.text}</h1>
      <p><strong>Start Date:</strong> {new Date(event.start.utc).toLocaleString()}</p>
      <p><strong>End Date:</strong> {new Date(event.end.utc).toLocaleString()}</p>
      <p><strong>Summary:</strong> {event.summary}</p>
      <p><strong>Capacity:</strong> {event.capacity}</p>
      <p><strong>Description:</strong> {event.description.html}</p>  
    </div>
    <Order eventId={eventId}/>
    </>
  
  );
};

export default SingularEvent;
