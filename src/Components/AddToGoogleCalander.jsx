import React from 'react';
import { Button } from 'react-bootstrap';
import googleImg from '../Images/7123030_google_calendar_icon.png';

const AddToGoogleCalendar = ({ event }) => {
  const formatDate = (dateObj) => {
    if (!dateObj || !dateObj.utc) {
      console.error('Date object or UTC date is undefined');
      return null;
    }

    const d = new Date(dateObj.utc); 
    if (isNaN(d.getTime())) {
      console.error('Invalid date:', dateObj.utc);
      return null;
    }

    return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const handleAddToCalendar = () => {
    const startDate = formatDate(event.start);
    const endDate = formatDate(event.end);

    if (!startDate || !endDate) {
      alert('Invalid event dates!');
      return;
    }

    const summary = encodeURIComponent(event.name.text || 'Event');
    const location = encodeURIComponent(event.venue?.address?.localized_address_display || '');
    const description = encodeURIComponent(event.description?.text || '');

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${summary}&dates=${startDate}/${endDate}&location=${location}&details=${description}`;

    window.open(googleCalendarUrl, "_blank");
  };

  return <Button variant="dark" onClick={handleAddToCalendar} size="sm"> 
  <img 
            src={googleImg} 
            alt="Google Calendar" 
            style={{ width: '20px', height: '20px', marginRight: '8px' }} 
          />
  Add to Google Calendar</Button>;
};

export default AddToGoogleCalendar;
