import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import "./Styling/singularevent.css"

const Order = ({ eventId }) => {
  useEffect(() => {
    
    const script = document.createElement('script');
    script.src = 'https://www.eventbrite.com/static/widgets/eb_widgets.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
     
      window.EBWidgets.createWidget({
        widgetType: 'checkout',
        eventId: eventId, 
        modal: true, 
        modalTriggerElementId: `eventbrite-widget-modal-trigger-${eventId}`, 
        onOrderComplete: () => {
          console.log('Order complete!');
        }
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [eventId]); 

  return (
    <div>
      <h2>Buy Tickets</h2>
     
      <Button className='orderbutton' variant="dark" id={`eventbrite-widget-modal-trigger-${eventId}`} 
     
      >Sign up to Event</Button>
    </div>
  );
};

export default Order;
