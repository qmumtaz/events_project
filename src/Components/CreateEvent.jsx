import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CreateEvent = () => {
    const [organizations, setOrganizations] = useState([]);

    //:TODO -- fix this class 
    const formatDate = (date) => {
        return date.toISOString(); 
    };

    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const response = await axios.get('https://www.eventbriteapi.com/v3/users/me/organizations', {
                    headers: {
                        'Authorization': `Bearer ${import.meta.env.REACT_APP_API_KEY}` 
                    }
                });
                setOrganizations(response.data.organizations);
            } catch (error) {
                console.error('Error fetching organizations:', error);
            }
        };

        fetchOrganizations();
    }, []);

    const createEvent = async () => {
        const startDate = formatDate(new Date(Date.now() + 15 * 60000)); // 15 minutes from now
        const endDate = formatDate(new Date(Date.now() + 30 * 60000)); // 30 minutes from now

        try {
            const response = await axios.post(`https://www.eventbriteapi.com/v3/organizations/${organizations[0]?.id}/events/`, {
                event: {
                    name: { html: 'New Meeting ASAP' },
                    start: { timezone: "Europe/London", utc: startDate },
                    end: { timezone: "Europe/London", utc: endDate },
                    currency: 'USD'
                }
            }, {
                headers: {
                    'Authorization': `Bearer ${import.meta.env.REACT_APP_API_KEY}`,
                    'Accept': 'application/json'
                }
            });
            console.log('Event Created:', response.data);
        } catch (error) {
            console.error('Error creating event:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <h1>Create Event</h1>
            <button onClick={createEvent}>Create Event</button>
            <ul>
                {organizations.map(org => (
                    <li key={org.id}>{org.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CreateEvent;
