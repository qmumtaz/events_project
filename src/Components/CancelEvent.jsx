import React, { useState } from 'react';
import axios from 'axios';

const CancelEvent = ({ eventId, eventName, onCancel }) => {
    const apiKey = import.meta.env.VITE_EVENTBRITE_API_KEY;
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [notification, setNotification] = useState('');

    const cancelEvent = async () => {
        try {
            const response = await axios.post(`https://www.eventbriteapi.com/v3/events/${eventId}/cancel/`, {}, {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            setSuccess(true);
            setNotification(`Event "${eventName}" has been successfully canceled.`); 
           
            const canceledEvents = JSON.parse(localStorage.getItem('canceledEvents')) || [];
            localStorage.setItem('canceledEvents', JSON.stringify([...canceledEvents, eventId]));

           
            if (onCancel) {
                onCancel(eventId);
            }
        } catch (error) {
         
            const errorMessage = error.response?.data?.error_description || 'Cannot cancel this event';
            setError(errorMessage);
        }
    };

    const handleCancel = () => {
        const confirmed = window.confirm('Are you sure you want to cancel this event?');
        if (confirmed) {
            cancelEvent();
        }
    };

    return (
        <div>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>} 
            {success && <p>{notification}</p>} 
            <button onClick={handleCancel}>Cancel Event</button>
        </div>
    );
};

export default CancelEvent;
