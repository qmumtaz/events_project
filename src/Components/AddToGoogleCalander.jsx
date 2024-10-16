import React from 'react';

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

  return <button onClick={handleAddToCalendar}>Add to Google Calendar</button>;
};

export default AddToGoogleCalendar;
