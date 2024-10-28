import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Alert, Spinner, Container, Row, Col } from 'react-bootstrap';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdateEvents = () => {
    const [eventName, setEventName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [fetchingData, setFetchingData] = useState(true);
    const { eventId } = useParams();
    const navigate = useNavigate();

    const apiKey = import.meta.env.VITE_EVENTBRITE_API_KEY;

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(
                    `https://www.eventbriteapi.com/v3/events/${eventId}/`,
                    {
                        headers: {
                            Authorization: `Bearer ${apiKey}`,
                        },
                    }
                );

                const event = response.data;
                setEventName(event.name.text);
                setSummary(event.description.text || '');
                setStartDate(event.start.utc.replace(/\.\d{3}/, ''));
                setEndDate(event.end.utc.replace(/\.\d{3}/, ''));
                setCurrency(event.currency);
            } catch (error) {
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

    const updateEvent = async (eventName, startDate, endDate, currency, summary) => {
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
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            navigate('/events');
        } catch (error) {
            
            throw error;
        }
    };

    const handleUpdateEvent = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        if (eventName.length < 10) {
            setAlertMessage('Event name must be at least 10 characters long.');
            setShowAlert(true);
            setLoading(false);
            return;
        }
        if (summary.length < 10) {
            setAlertMessage('Summary must be at least 10 characters long.');
            setShowAlert(true);
            setLoading(false);
            return;
        }

        if (isDateInPast(startDate)) {
            setError({ message: 'Start date cannot be today or in the past.' });
            setLoading(false);
            return;
        }

        try {
            const formattedStartDate = new Date(startDate).toISOString().replace(/\.\d{3}/, '');
            const formattedEndDate = new Date(endDate).toISOString().replace(/\.\d{3}/, '');
            await updateEvent(eventName, formattedStartDate, formattedEndDate, currency, summary);
            setSuccess(true);
        } catch (error) {
            setError(error);
            setShowAlert(true);
        } finally {
            setLoading(false);
        }
    };

    if (fetchingData) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p>Loading event details...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <RiArrowGoBackFill className='backbtn' onClick={() => navigate(-1)}/> 
            <h2 className="text-center mb-4">Update Event</h2>
            {showAlert && <Alert variant="danger">{alertMessage}</Alert>}
            {success && <Alert variant="success">Event created successfully!</Alert>}
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        placeholder="Enter the event name"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Summary</Form.Label>
                    <Form.Control
                        as="textarea"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        rows={4}
                        placeholder="Enter a brief summary of the event"
                        required
                    />
                </Form.Group>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Currency</Form.Label>
                    <Form.Select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <option value="USD">USD</option>
                        <option value="GBP">GBP</option>
                        <option value="EUR">EUR</option>
                        <option value="CAD">CAD</option>
                    </Form.Select>
                </Form.Group>

                <div className="text-center">
                    <Button
                        variant="dark"
                        onClick={handleUpdateEvent}
                        disabled={loading}
                    >
                        {loading ? (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        ) : (
                            'Update Event'
                        )}
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default UpdateEvents;
