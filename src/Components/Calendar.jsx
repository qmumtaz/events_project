import React from 'react'
import MyBigCalendar from './MyBigCalander'

function Calendar() {

  const eventsData = [
    {
      id: '1',
      name: { text: 'Event 1' },
      start: { local: '2024-10-15T10:00:00Z' },
      end: { local: '2024-10-15T12:00:00Z' },
    },
    {
      id: '2',
      name: { text: 'Event 2' },
      start: { local: '2024-10-16T14:00:00Z' },
      end: { local: '2024-10-16T16:00:00Z' },
    },
    // ...more events
  ];
  
  // Inside your main component or app
  <MyBigCalendar events={eventsData} />
  
  return (
    <div>
      <MyBigCalendar events={eventsData} />
    </div>
  )
}

export default Calendar