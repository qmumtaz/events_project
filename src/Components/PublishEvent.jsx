import React, { useState } from 'react';
import axios from 'axios';

const PublishEvent = ({ eventId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const apiKey = import.meta.env.VITE_EVENTBRITE_API_KEY; 

  const publishEvent = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    setError(null);
    setSuccess(false);

    console.log('Publishing event with ID:', eventId); 

    try {
      const response = await axios.post(
        `https://www.eventbriteapi.com/v3/events/${eventId}/publish/`, 
        {},
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setSuccess(true);
    } catch (error) {
      setError(error.response?.data || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={publishEvent} disabled={loading}>
        {loading ? 'Publishing...' : 'Publish Event'}
      </button>

      {success && <p>Event published successfully!</p>}
      {error && <p>Error publishing event: {error.message}</p>}
    </div>
  );
};

export default PublishEvent;
