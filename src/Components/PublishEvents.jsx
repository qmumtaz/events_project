import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Card, ListGroup, Spinner } from 'react-bootstrap';
import "./Styling/publishevents.css"

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

  if (loading) return <Spinner animation="border" role="status">
  <span className="visually-hidden">Loading...</span>
</Spinner>  ;
  if (error) return <p>Error fetching draft events: {error.message}</p>;

  return (
    < Card style={{ width: '18rem' }}>
      <  Card.Header>Draft Events</Card.Header>
      {draftEvents.length > 0 ? (
        <ListGroup variant="flush">
          {draftEvents.map((event) => (
            <ListGroup.Item key={event.id} className='list-item'>
              Event name : {event.name.text}
              <br></br>
              <Link to={`/publish/${event.id}`}>
                <Button variant='dark' size='sm'>Publish Event</Button>
              </Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>No draft events to publish.</p>
      )}
    </Card>
  );
};

export default PublishEvents;
