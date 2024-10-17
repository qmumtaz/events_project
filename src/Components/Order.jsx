import React, { useEffect } from 'react';

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
     
      <button id={`eventbrite-widget-modal-trigger-${eventId}`}>Sign up to Event</button>
    </div>
  );
};

export default Order;
