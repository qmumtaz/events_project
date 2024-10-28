import axios from 'axios';
import React, { useState } from 'react';
import Ticket from './Ticket'; 
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { RiArrowGoBackFill } from 'react-icons/ri';

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
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();
    
    const apiKey = import.meta.env.VITE_EVENTBRITE_API_KEY;
    const orgID = import.meta.env.VITE_ORG_ID;

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
            setSuccess(true);
            return response.data;
        } catch (error) {
            setError('Failed to create event. Please try again.');
            setShowAlert(true);
            throw error;
        }
    };

    const handleCreateEvent = async () => {
        setLoading(true);
        setError(null);
        setShowAlert(false);

        if (eventName.length < 10 || eventName.length > 100) {
            setAlertMessage('Event name must be at least 10 characters long and less than 100.');
            setShowAlert(true);
            setLoading(false);
            return;
        }
        if (summary.length < 10 || summary.length > 200 ) {
            setAlertMessage('Summary must be at least 10 characters long and less than 200.');
            setShowAlert(true);
            setLoading(false);
            return;
        }
        if (isDateInPast(startDate)) {
            setAlertMessage('Start date cannot be today or in the past.');
            setShowAlert(true);
            setLoading(false);
            return;
        }

        try {
            const formattedStartDate = new Date(startDate).toISOString().replace(/\.\d{3}/, '');
            const formattedEndDate = new Date(endDate).toISOString().replace(/\.\d{3}/, '');

            await createEvent(orgID, eventName, formattedStartDate, formattedEndDate, currency, summary);
        } catch (error) {
            setAlertMessage('An error occurred while creating the event. Please try again later.');
            setShowAlert(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <RiArrowGoBackFill className='backbtn' onClick={() => navigate(-1)} /> 
            <h2>Create Event</h2>
            <p>You must create the event first, then complete the ticket details.</p>
            
            {showAlert && <Alert variant="danger">{alertMessage}</Alert>}
            {success && <Alert variant="success">Event created successfully!</Alert>}
            
            {!success ? (
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Event Name:</Form.Label>
                        <Form.Control
                            type="text"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            required
                            placeholder="Enter event name"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Summary:</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            required
                            rows={4}
                            placeholder="Enter event summary"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Start Date:</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>End Date:</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Currency:</Form.Label>
                        <Form.Control
                            as="select"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <option value="USD">USD</option>
                            <option value="GBP">GBP</option>
                            <option value="EUR">EUR</option>
                            <option value="CAD">CAD</option>
                        </Form.Control>
                    </Form.Group>

                    <Button variant="dark" onClick={handleCreateEvent} disabled={loading}>
                        {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Create Event'}
                    </Button>
                </Form>
            ) : (
                <div>
                    <h3>Create Ticket</h3>
                    <Ticket eventId={eventId} currency={currency} />
                </div>
            )}
        </div>
    );
};

export default CreateEvent;
