// src/MyBigCalendar.jsx
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useAuth } from '../../AuthContext';
import { db } from '../../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const localizer = momentLocalizer(moment);

const MyBigCalendar = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      if (user) {
        try {
          const eventsCollection = collection(db, 'users', user.uid, 'events');
          const eventsSnapshot = await getDocs(eventsCollection);
          const eventsData = eventsSnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
            start: new Date(doc.data().start),
            end: new Date(doc.data().end),
          }));
          console.log("Fetched Events:", eventsData); 
          setEvents(eventsData);
        } catch (error) {
          console.error('Error fetching events from Firestore:', error);
        }
      }
    };

    fetchEvents();
  }, [user]);

  const handleSelectEvent = async (event) => {
    if (window.confirm(`Do you want to remove the event: ${event.title}?`)) {
      try {
        const eventDoc = doc(db, 'users', user.uid, 'events', event.id);
        await deleteDoc(eventDoc);
        setEvents(events.filter((e) => e.id !== event.id));
      } catch (error) {
        console.error('Error removing event: ', error);
      }
    }
  };

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
