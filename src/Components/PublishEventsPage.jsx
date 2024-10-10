import React from 'react';
import { useParams } from 'react-router-dom'; 
import PublishEvent from './PublishEvent';

const PublishEventPage = () => {
  const { id } = useParams(); 

  return (
    <div>
      <h2>Publish Event</h2>
      <p>You're about to publish event ID: {id}</p>
      <PublishEvent eventId={id} /> 
    </div>
  );
};

export default PublishEventPage;
