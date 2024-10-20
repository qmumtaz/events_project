import React from 'react'
import "./Styling/eventitem.css"
import Card from 'react-bootstrap/Card';
import { ListGroup } from 'react-bootstrap';


const EventItem = ({events}) => {

  return (
    <>
        <Card style={{ width: '18rem' }}>
            <Card.Body> 
            <Card.Title>{events.name.text}</Card.Title> 
            <Card.Subtitle className="mb-2 text-muted"><strong>Summary:</strong> {events.summary}</Card.Subtitle> 
            </Card.Body>
            <ListGroup className="list-group-flush">
            <ListGroup.Item>Start Date : {new Date(events.start.utc).toLocaleString(undefined, {  year: 'numeric', month: 'long',  day: 'numeric'})} </ListGroup.Item>
            <ListGroup.Item>Status: {events.status}</ListGroup.Item>
            </ListGroup>
            
        </Card>
        <div>
        </div>
    

    </>


  )
}

export default EventItem
