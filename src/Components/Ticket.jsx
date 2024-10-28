import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

const Ticket = ({ eventId, currency }) => {
    const [ticketName, setTicketName] = useState('');
    const [quantityTotal, setQuantityTotal] = useState(1);
    const [isFree, setIsFree] = useState(false); 
    const [cost, setCost] = useState(''); 
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const apiKey = import.meta.env.VITE_EVENTBRITE_API_KEY;

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value >= 1 && value <= 200) {
            setQuantityTotal(value);
        }
    };

    const createTicket = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);
    
        console.log('Creating ticket for event ID:', eventId);
    
        try {
            const formattedCost = isFree ? null : `${currency},${(parseFloat(cost) * 100).toFixed(0)}`;

            const ticketData = {
                ticket_class: {
                    name: ticketName,
                    quantity_total: quantityTotal,
                    free: isFree
                }
            };

            if (!isFree && formattedCost) {
                ticketData.ticket_class.cost = formattedCost;
            }
    
            await axios.post(
                `https://www.eventbriteapi.com/v3/events/${eventId}/ticket_classes/`,
                ticketData,
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
            setError('You must create an Event first, then a ticket');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Ticket created successfully!</Alert>}
            
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Ticket Name:</Form.Label>
                    <Form.Control
                        type="text"
                        value={ticketName}
                        onChange={(e) => setTicketName(e.target.value)}
                        required
                        placeholder="Enter the type of ticket e.g. VIP or Free"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Quantity Total (1-200):</Form.Label>
                    <Form.Control
                        type="number"
                        value={quantityTotal}
                        onChange={handleQuantityChange}
                        required
                        placeholder="Enter total amount of tickets"
                        min="1"
                        max="200"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check 
                        type="checkbox"
                        label="Free Ticket"
                        checked={isFree}
                        onChange={() => {
                            setIsFree(!isFree);
                            if (!isFree) setCost(''); 
                        }}
                    />
                </Form.Group>

                {!isFree && (
                    <Form.Group className="mb-3">
                        <Form.Label>Cost (in dollars):</Form.Label>
                        <Form.Control
                            type="number"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            required={!isFree}
                            placeholder="Enter cost in dollars"
                        />
                    </Form.Group>
                )}

                <Button variant="dark" onClick={createTicket} disabled={loading}>
                    {loading ? (
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    ) : (
                        'Create Ticket'
                    )}
                </Button>
            </Form>
        </div>
    );
};

export default Ticket;
