import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PublishEvent = ({ eventId, eventName }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [hasTicket, setHasTicket] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_EVENTBRITE_API_KEY;

  useEffect(() => {

    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          `https://www.eventbriteapi.com/v3/events/${eventId}/ticket_classes/`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );

        const tickets = response.data.ticket_classes || [];
        setHasTicket(tickets.length > 0);

        if (tickets.length === 0) {
          setAlertMessage('No ticket assigned to this event. Please create a ticket before publishing.');
          setShowAlert(true);
        }
      } catch (err) {
        setError('Failed to verify ticket information');
        setShowAlert(true);
      }
    };

    fetchTickets();
  }, [eventId, apiKey]);

  const publishEvent = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!hasTicket) {
      setAlertMessage('No ticket assigned. Please create a ticket before publishing the event.');
      setShowAlert(true);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);
    setShowAlert(false);

    try {
      await axios.post(
        `https://www.eventbriteapi.com/v3/events/${eventId}/publish/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setSuccess(true);
      navigate('/events');
    } catch (error) {
      setError(error.response?.data || 'An error occurred');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          {alertMessage || error}
        </Alert>
      )}

      <Button onClick={publishEvent} disabled={loading || !hasTicket} variant="dark">
        {loading ? 'Publishing...' : `Publish ${eventName}`}
      </Button>

      {success && <Alert variant="success">Event "{eventName}" published successfully!</Alert>}
    </Container>
  );
};

export default PublishEvent;
