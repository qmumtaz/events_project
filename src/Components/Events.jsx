import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import EventItem from './EventItem';
import "./Styling/events.css"
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
        <div >
            <h2>Upcoming Events</h2>
            <Link to="/createevent">
                <button>Create event</button>
            </Link>
            {organizations.length > 0 ? ( 
                <ul className='eventslist'>
                    {organizations.map(event => (
                       <Link to={`/event/${event.id}`} ><li key={event.id}><EventItem events={event}/></li> </Link> 
                    ))}
                </ul>
            ) : (
                <p>No events to show at the moment. Check back later!</p>
            )}
            
        </div>
    );
};

export default Events;
