import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';


const localizer = momentLocalizer(moment);

const MyBigCalendar = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
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
                start: new Date(event.start.local),
                end: new Date(event.end.local),
            }));

            setEvents(formattedEvents);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching events:', error);
            setError('Failed to load events.');
            setLoading(false);
        }
    };

    fetchEvents();
}, [apiKey, orgID]);


  const handleSelectEvent = async (event) => {
    if (window.confirm(`Do you want to go the event: ${event.title}?`)) {
      try {
        
        navigate(`/event/${event.id}`)
      } catch (error) {
       setError(error)
      }
    }
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
};

export default MyBigCalendar;
