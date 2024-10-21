import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import "./Styling/mybigcalander.css"
import { Button, Card } from 'react-bootstrap';

const localizer = momentLocalizer(moment);

const MyBigCalendar = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const apiKey = import.meta.env.VITE_EVENTBRITE_API_KEY;
  const orgID = import.meta.env.VITE_ORG_ID;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `https://www.eventbriteapi.com/v3/organizations/${orgID}/events/`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );

        const fetchedEvents = response.data.events || [];

        const filteredEvents = fetchedEvents.filter(
          (event) => event.status === 'draft' || event.status === 'completed'
        );

        const formattedEvents = filteredEvents.map((event) => ({
          id: event.id,
          title: event.name.text,
          description: event.description.text,
          start: new Date(event.start.local),
          end: new Date(event.end.local),
          location: event.venue ? event.venue.address.localized_address_display : 'Online',
        }));

        setEvents(formattedEvents);
        setLoading(false);
      } catch (error) {
        setError('Failed to load events.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, [apiKey, orgID]);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseDetails = () => {
    setSelectedEvent(null);
  };

  const EventDetailsPopup = ({ event }) => (
    <Card style={{ width: '18rem' }} className="mb-2">
    <div className="event-popup" >
    <Card.Header>{event.title}</Card.Header>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Start:</strong> {event.start.toLocaleString()}</p>
      <p><strong>End:</strong> {event.end.toLocaleString()}</p>
      <Button variant='dark' onClick={() => navigate(`/event/${event.id}`)}>View Full Event</Button>
      
      <Button variant='dark' onClick={handleCloseDetails}>Close</Button>
    </div>
    </Card>
  );


  if (loading) return <p>Loading events...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ position: 'relative' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onSelectEvent={handleSelectEvent}
      />

      {selectedEvent && (
        <EventDetailsPopup event={selectedEvent} />
      )}
    </div>
  );
};

export default MyBigCalendar;
