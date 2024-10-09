import React from 'react'
import "./Styling/eventitem.css"
import PublishEvent from './PublishEvent'
import AddToGoogleCalendar from './AddToGoogleCalander'

const EventItem = ({events}) => {

  return (
    <>
        <div className="event-item">
            <h3>{events.name.text}</h3> 
            <p><strong>Start Date:</strong> {new Date(events.start.utc).toLocaleString()}</p> 
            <p><strong>End Date:</strong> {new Date(events.end.utc).toLocaleString()}</p> 
            <p><strong>Summary:</strong> {events.summary}</p> 
            <p><strong>capacity:</strong> {events.capacity}</p> 
        </div>
        <div>

          <div className='publishevent'> 
          <PublishEvent eventId={events.id}  />
          </div>
        
        </div>
    
       

        <AddToGoogleCalendar  event={{
    startDate: events.startDate, 
    endDate: '2024-10-05T13:13:00Z',
    summary: events.name.text,
    location: 'Online',
    description: events.summary}} />
    
    </>


  )
}

export default EventItem
