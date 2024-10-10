import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PublishEvents = () => {
  const [draftEvents, setDraftEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_EVENTBRITE_API_KEY;
  const orgID = import.meta.env.VITE_ORG_ID;

  useEffect(() => {
    async function fetchDraftEvents() {
      try {
        const response = await axios.get(
          `https://www.eventbriteapi.com/v3/organizations/${orgID}/events/?status=draft`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );

        setDraftEvents(response.data.events || []);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchDraftEvents();
  }, []);

  if (loading) return <p>Loading draft events...</p>;
  if (error) return <p>Error fetching draft events: {error.message}</p>;

  return (
    <div>
      <h2>Draft Events</h2>
      {draftEvents.length > 0 ? (
        <ul>
          {draftEvents.map((event) => (
            <li key={event.id}>
              {event.name.text}
              <Link to={`/publish/${event.id}`}>
                <button>Publish Event</button>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No draft events to publish.</p>
      )}
    </div>
  );
};

export default PublishEvents;
