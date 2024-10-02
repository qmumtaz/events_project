import React from 'react'
import "./Styling/eventitem.css"

const EventItem = ({events}) => {
  return (
    <div className="event-item">
            <h3>{events.name.text}</h3> 
            <p><strong>Start Date:</strong> {new Date(events.start.utc).toLocaleString()}</p> 
            <p><strong>End Date:</strong> {new Date(events.end.utc).toLocaleString()}</p> 
            <p><strong>Summary:</strong> {events.summary}</p> 
            <p><strong>capacity:</strong> {events.capacity}</p> 
</div>
  )
}

export default EventItem
