import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateEvents =() => {
    const [eventName, setEventName] = useState('');
    const [startDate, setStartDate] = useState(''); 
    const [endDate, setEndDate] = useState('');     
    const [currency, setCurrency] = useState('USD'); 
    const [summary, setSummary] = useState(''); 
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [fetchingData, setFetchingData] = useState(true);
    const { eventId } = useParams(); 

    //this part is done 

    const apiKey = import.meta.env.VITE_EVENTBRITE_API_KEY;

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(
                    `https://www.eventbriteapi.com/v3/events/${eventId}/`, 
                    {
                        headers: {
                            'Authorization': `Bearer ${apiKey}`
                        }
                    }
                );

                const event = response.data;

               
                setEventName(event.name.text);
                setSummary(event.description.text || '');
                setStartDate(event.start.utc.replace(/\.\d{3}/, ''));
                setEndDate(event.end.utc.replace(/\.\d{3}/, ''));
                setCurrency(event.currency);
            } catch (error) {
                console.error('Error fetching event details:', error);
                setError({ message: 'Failed to fetch event details.' });
            } finally {
                setFetchingData(false);
            }
        };

        fetchEventDetails();
    }, [eventId, apiKey]);

    const isDateInPast = (date) => {
        const now = new Date();
        return new Date(date) <= now; 
    };

  
    console.log(eventId);
   

    const updateEvent =  async(eventName, startDate, endDate , currency , summary) => {
        try {
            const response = await axios.post(
                `https://www.eventbriteapi.com/v3/events/${eventId}/`, 
                {
                    event: {
                        name: { html: eventName },
                        description: { html: summary }, 
                        start: { timezone: 'Europe/London', utc: startDate },
                        end: { timezone: 'Europe/London', utc: endDate },
                        currency: currency,
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    }
                }
            );
           

            console.log(response)
            
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    }

    const handleUpdateEvent = async () => {
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

            const eventUpdated = await updateEvent( eventName, formattedStartDate, formattedEndDate, currency, summary);
            
            setSuccess(true);
            console.log('Created event:', eventUpdated);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    if (fetchingData) {
        return <p>Loading event</p>
    }


  return (
    <div style={{ padding: '20px' }}>
    <h2>Update Event</h2>

    {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    {success && <p style={{ color: 'green' }}>Event Updated successfully!</p>}
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
   
    <button onClick={handleUpdateEvent} disabled={loading}>
        {loading ? 'Update event' : 'Update Event'}
    </button>
    
</div>
  )
}

export default UpdateEvents