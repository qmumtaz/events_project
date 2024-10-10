import React from 'react'
import "./Styling/eventitem.css"
import PublishEvent from './PublishEvent'
import AddToGoogleCalendar from './AddToGoogleCalander'

const EventItem = ({events}) => {

  return (
    <>
        <div className="event-item">
            <h3>{events.name.text}</h3> 
            <p><strong>Start Date:</strong> {new Date(events.start.utc).toLocaleString(undefined, {  year: 'numeric', month: 'long',  day: 'numeric'})}</p> 
            <p><strong>End Date:</strong> {new Date(events.end.utc).toLocaleString(undefined, { year: 'numeric',  month: 'long',  day: 'numeric' })}</p> 
            <p><strong>Summary:</strong> {events.summary}</p> 
            <p><strong>capacity:</strong> {events.capacity}</p> 
            <p><strong>Status:</strong> {events.on_sale_status}</p> 
        </div>
        <div>
        </div>
    
       

        {/* <AddToGoogleCalendar  event={{
    startDate: events.startDate, 
    endDate: '2024-10-05T13:13:00Z',
    summary: events.name.text,
    location: 'Online',
    description: events.summary}} /> */}
    
    </>


  )
}

export default EventItem
