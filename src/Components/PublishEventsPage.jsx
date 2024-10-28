import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import PublishEvent from './PublishEvent';

const PublishEventPage = () => {
  const { id } = useParams();
  const [eventName, setEventName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_EVENTBRITE_API_KEY;

  useEffect(() => {
    const fetchEventName = async () => {
      try {
        const response = await axios.get(
          `https://www.eventbriteapi.com/v3/events/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
        setEventName(response.data.name.text); 
        
      } catch (err) {
        setError('Failed to fetch event name');
      } finally {
        setLoading(false);
      }
    };

    fetchEventName();
  }, [id, apiKey]);

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Publish Event</h2>
      <p>You're about to publish event Name: {eventName}</p>
      <PublishEvent eventId={id} eventName={eventName} />
    </div>
  );
};

export default PublishEventPage;
