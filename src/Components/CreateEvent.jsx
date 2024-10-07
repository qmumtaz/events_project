import axios from 'axios';
import React, { useState } from 'react';
import Ticket from './Ticket';

const CreateEvent = () => {
    const [eventName, setEventName] = useState('');
    const [eventId, setEventId] = useState(null);
    const [startDate, setStartDate] = useState(''); 
    const [endDate, setEndDate] = useState('');     
    const [currency, setCurrency] = useState('USD'); 
    const [summary, setSummary] = useState(''); 
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const apiKey = import.meta.env.VITE_EVENTBRITE_API_KEY;
    const orgID = import.meta.env.VITE_ORG_ID;

    // :TODO - try to get image , location, update events and deletes with also publishing the event
   


    const isDateInPast = (date) => {
        const now = new Date();
        return new Date(date) <= now; 
    };

    const createEvent = async (organizationId, eventName, startDate, endDate, currency, summary) => {
        try {
            const response = await axios.post(`https://www.eventbriteapi.com/v3/organizations/${organizationId}/events/`, {
                event: {
                    name: { html: eventName },
                    description: { html: summary }, 
                    start: { timezone: 'Europe/London', utc: startDate },
                    end: { timezone: 'Europe/London', utc: endDate },
                    currency: currency,
                }
            }, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                }
            });
            const createdEventId = response.data.id; 
             
            setEventId(createdEventId);
            
            console.log('Event created:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    };

    const handleCreateEvent = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        if (isDateInPast(startDate)) {
            setError({ message: 'Start date cannot be today or in the past.' });
            setLoading(false);
            return;
        }

        try {
            const formattedStartDate = new Date(startDate).toISOString().replace(/\.\d{3}/, '');
            const formattedEndDate = new Date(endDate).toISOString().replace(/\.\d{3}/, '');

            const eventCreated = await createEvent(orgID, eventName || 'Test Event', formattedStartDate, formattedEndDate, currency, summary);
            
            setSuccess(true);
            console.log('Created event:', eventCreated);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Create Event</h2>
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
            {success && <p style={{ color: 'green' }}>Event created successfully!</p>}
            <div>
                <label>Event Name:</label>
                <input 
                    type="text" 
                    value={eventName} 
                    onChange={(e) => setEventName(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Summary:</label> 
                <textarea 
                    value={summary} 
                    onChange={(e) => setSummary(e.target.value)} 
                    required 
                    rows="4" 
                    cols="50"
                />
            </div>
            <div>
                <label>Start Date:</label>
                <input 
                    type="datetime-local" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>End Date:</label>
                <input 
                    type="datetime-local" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Currency:</label>
                <select 
                    value={currency} 
                    onChange={(e) => setCurrency(e.target.value)} 
                >
                    <option value="USD">USD</option>
                    <option value="GBP">GBP</option>
                    <option value="EUR">EUR</option>
                    <option value="CAD">CAD</option>
                </select>
            </div>
           
            <button onClick={handleCreateEvent} disabled={loading}>
                {loading ? 'Creating Event...' : 'Create Event'}
            </button>
            <Ticket eventId={eventId}  />
        </div>
    );
};

export default CreateEvent;
