import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Order from './Order';
import AddToGoogleCalendar from './AddToGoogleCalander';
import {  Card, Spinner } from 'react-bootstrap';
import "./Styling/singularevent.css"
import { RiArrowGoBackFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { ShareSocial } from 'react-share-social';


const SingularEvent = () => {
  const { eventId } = useParams(); 
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_EVENTBRITE_API_KEY;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `https://www.eventbriteapi.com/v3/events/${eventId}/`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
        setEvent(response.data);
        setLoading(false);
        
      } catch (err) {
        setError('Failed to load event details.');
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, apiKey]);

  if (loading) return  <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span> </Spinner> ;
  if (error) return <p>{error}</p>;
  console.log(event);
  
  return (
    <>
    <Card className="text-center event-card">
      <div>
       <RiArrowGoBackFill className='backbtn' onClick={() => navigate(-1)}/>      
      </div>
  
      <Card.Header> <strong>{event.name.text} </strong></Card.Header>
      <Card.Body>
        <Card.Text>
          Description: {event.description.html}
        </Card.Text>
        <Card.Text>
          Capacity: {event.capacity} <br />
         Currency: {event.currency}<br />
         Free or Paid: {event.is_free ? 'Free' : 'Paid'}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted text-footer">
        <strong>Start Date:</strong> {new Date(event.start.utc).toLocaleString()}
      </Card.Footer>
      <Card.Footer className="text-muted text-footer">
        <strong>End Date:</strong> {new Date(event.end.utc).toLocaleString()}
      </Card.Footer>
      <div className="d-grid gap-2">
      <Order eventId={eventId} />
      <AddToGoogleCalendar event={event} />
      
      </div>
      
    </Card>
    <div className="share-container">
    <ShareSocial
      className="socialMedia"
      url={`https://www.eventbrite.com/e/dsadasdasd-tickets-${eventId}`}
      socialTypes={['facebook', 'twitter', 'reddit', 'linkedin']}
    />
  </div>
   
    
    </>
  
  );
};

export default SingularEvent;
