import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const Events = () => {
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getEvents() {
            const apiKey = import.meta.env.VITE_EVENTBRITE_API_KEY;
            const orgID = import.meta.env.VITE_ORG_ID;

            try {
                
                const response = await axios.get(`https://www.eventbriteapi.com/v3/organizations/${orgID}/events/`, {
                    headers: {
                        'Authorization': `Bearer ${apiKey}` 
                    }
                });

                console.log("Full response:", response.data); 

            
                setOrganizations(response.data.events || []); 
                setLoading(false); 

            } catch (error) {
                console.error('Error fetching events:', error); 
                setError(error); 
                setLoading(false); 
            }
        }

        getEvents();
    }, []); 

   
    if (loading) {
        return <p>Loading events...</p>;
    }

    if (error) {
        return <p>Error fetching events: {error.message}</p>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Upcoming Events</h2>
            {organizations.length > 0 ? ( 
                <ul>
                    {organizations.map(event => (
                        <li key={event.id}>{event.name.text}</li> 
                    ))}
                </ul>
            ) : (
                <p>No events to show at the moment. Check back later!</p>
            )}
            <Link to="/createevent">
                <button>Create event</button>
            </Link>
        </div>
    );
};

export default Events;
