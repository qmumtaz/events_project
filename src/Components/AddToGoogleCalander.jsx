import React, { useState } from 'react';

const AddToGoogleCalendar = ({ event }) => {
  const formatDate = (date) => {
    if (!date) {
        console.error('Date is undefined');
        return null; // Handle undefined case
    }

    const d = new Date(date);
    if (isNaN(d.getTime())) {
        console.error('Invalid date:', date);
        return null;
    }
    return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
};

  const handleAddToCalendar = () => {
    const startDate = formatDate(event.startDate);
    const endDate = formatDate(event.endDate);

    // Check if the formatted dates are valid
    if (!startDate || !endDate) {
      alert('Invalid event dates!'); // Notify the user if dates are invalid
      return;
    }

    const summary = encodeURIComponent(event.summary);
    const location = encodeURIComponent(event.location || '');
    const description = encodeURIComponent(event.description || '');

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${summary}&dates=${startDate}/${endDate}&location=${location}&details=${description}`;

    window.open(googleCalendarUrl, "_blank"); // Opens in a new tab
  };

  return <button onClick={handleAddToCalendar}>Add to Google Calendar</button>;
};


export default AddToGoogleCalendar;
