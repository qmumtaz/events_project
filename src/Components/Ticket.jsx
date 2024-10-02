import React, { useState } from 'react';
import axios from 'axios';

const Ticket = ({ eventId }) => {
    const [ticketName, setTicketName] = useState('');
    const [quantityTotal, setQuantityTotal] = useState(0);
    const [isFree, setIsFree] = useState(false); 
    const [cost, setCost] = useState(''); 
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const apiKey = import.meta.env.VITE_EVENTBRITE_API_KEY;

    const createTicket = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const formattedCost = isFree ? null : `USD,${(parseFloat(cost) * 100).toFixed(0)}`; 

            const response = await axios.post(
                `https://www.eventbriteapi.com/v3/events/${eventId}/ticket_classes/`,
                {
                    ticket_class: {
                        name: ticketName,
                        quantity_total: quantityTotal,
                        free: isFree, // Set free option
                        cost: formattedCost, // Cost only if not free
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Ticket created:', response.data);
            setSuccess(true);
        } catch (error) {
            console.error('Error creating ticket:', error);
            setError(error.response?.data?.message || 'You must create an Event first then a ticket');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h3>Create Ticket Class</h3>
            {error && <p style={{ color: 'red' }}>Error: {error?.message || 'An error occurred'}</p>}
            {success && <p style={{ color: 'green' }}>Ticket created successfully!</p>}
            <div>
                <label>Ticket Name:</label>
                <input
                    type="text"
                    value={ticketName}
                    onChange={(e) => setTicketName(e.target.value)}
                    required
                     placeholder="Enter the type of ticket e.g VIP or Free"
                />
            </div>
            <div>
                <label>Quantity Total:</label>
                <input
                    type="number"
                    value={quantityTotal}
                    onChange={(e) => setQuantityTotal(e.target.value)}
                     placeholder="Enter total ammount of tickets"
                    required
                />
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={isFree}
                        onChange={() => {
                            setIsFree(!isFree);
                            if (!isFree) setCost(''); 
                        }}
                    />
                    Free Ticket
                </label>
            </div>
            {!isFree && (
                <div>
                    <label>Cost (in dollars):</label>
                    <input
                        type="number"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        required={!isFree}
                        placeholder="Enter cost in dollars"
                    />
                </div>
            )}
            <button onClick={createTicket} disabled={loading}>
                {loading ? 'Creating Ticket...' : 'Create Ticket'}
            </button>
        </div>
    );
};

export default Ticket;
