import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CancelEvent from './CancelEvent';
import {  Card, ListGroup, Spinner } from 'react-bootstrap';

const ManageEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiKey = import.meta.env.VITE_EVENTBRITE_API_KEY;
    const orgID = import.meta.env.VITE_ORG_ID;

    const getCanceledEvents = () => {
        const canceledEvents = localStorage.getItem('canceledEvents');
        return canceledEvents ? JSON.parse(canceledEvents) : [];
    };

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

                const canceledEvents = getCanceledEvents();
                const fetchedEvents = response.data.events || [];

                const filteredEvents = fetchedEvents.filter(event => !canceledEvents.includes(event.id));
                setEvents(filteredEvents);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);    

    const handleEventCancel = (eventId) => {
        setEvents(events.filter(event => event.id !== eventId)); 
    };

    if (loading) return <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>  ;
    if (error) return <p>Error fetching  events: {error.message}</p>;

    return (
        <div>
            <h2>Manage Events</h2>
            <Link to="/createevent">Create Events</Link>
            {events.length > 0 ? (
                <Card style={{ width: '18rem' }}>
                    {events.map(event => (
                        <Card.Body>
                    
                        <Card.Title>
                         <div className="fw-bold"></div>
                             <p>Event name : {event.name.text}</p>
                                  </Card.Title>
                            
                           
                            <CancelEvent 
                                eventId={event.id} 
                                eventName={event.name.text}  
                                onCancel={handleEventCancel} 
                            />
                            
                            
                          <Card.Link><Link to={`/updateevent/${event.id}`}>Update Events</Link></Card.Link>  
                            
                        </Card.Body>
                        
                    ))}
                </Card>
            ) : (
                <p>No events to manage at the moment.</p>
            )}
        </div>
    );
};

export default ManageEvents;
