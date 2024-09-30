// import axios from "axios";

// // Function to retrieve a list of organizations associated with the user
// // export const getOrganizations = async () => {
// //     try {
// //         // Make sure to include the full URL for the API endpoint
// //         const response = await axios.get('https://www.eventbriteapi.com/v3/users/me/organizations', {
// //             headers: {
// //                 'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}` // Use your API key from .env
// //             },
// //         });
// //         console.log('API Key being used:', import.meta.env.VITE_API_KEY);
// //         return response.data; // Return the data received from the API
// //     } catch (error) {
// //         console.error('Error fetching organizations:', error);
// //         throw error; // Rethrow the error
// //     }
// // };



// const formatDateToEventbrite = (date) => {
//     const year = date.getUTCFullYear();
//     const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
//     const day = String(date.getUTCDate()).padStart(2, '0');
//     const hours = String(date.getUTCHours()).padStart(2, '0');
//     const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  
//     // Return formatted string in "yyyy-MM-ddThh:mm" format
//     return `${year}-${month}-${day}T${hours}:${minutes}`;
//   };
  
//   // Function to create an event using Eventbrite API
//   export async function createEvent(organizationId, eventName, startDate, endDate, currency) {
//     try {
//       // Ensure startDate and endDate are Date objects
//       const formattedStartDate = formatDateToEventbrite(new Date(startDate));
//       const formattedEndDate = formatDateToEventbrite(new Date(endDate));
  
//       // Making a POST request to the Eventbrite API to create an event
//       const event = await axios.post(`https://www.eventbriteapi.com/v3/organizations/${organizationId}/events/`, {
//         event: {
//           name: {
//             html: eventName // Event name in HTML format
//           },
//           start: {
//             timezone: "Europe/London", 
//             utc: formattedStartDate 
//           },
//           end: {
//             timezone: "Europe/London", 
//             utc: formattedEndDate 
//           },
//           currency: currency, // Currency code (e.g., "USD")
//         }
//       }, {
//         headers: {
//           'Authorization': `Bearer ${import.meta.env.REACT_APP_API_KEY}`, // Authorization with API key from .env
//           'Accept': 'application/json' // Ensure that the API expects a JSON response
//         },
//       });
//       console.log(organizationId);
      
//       console.log('Event Created Successfully:', event.data); 
//       return event.data; 
  
//     } catch (error) {
//       // More robust error handling
//       if (error.response) {
//         console.error('Error Response:', error.response.data);
//         console.error('Status Code:', error.response.status);
//         console.error('Headers:', error.response.headers);
//       } else if (error.request) {
//         console.error('No Response from Eventbrite API:', error.request);
//       } else {
//         console.error('Error setting up request:', error.message);
//       }
//       throw error;
//     }
//   }

// // Function to fetch events
// export const getEvents = async (organizationId) => {
//     try {
//         const response = await axios.get(`https://www.eventbriteapi.com/v3/organizations/${organizationId}/events/`, {
//             headers: {
//                 'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}` // Authorization header with API key
//             },
//         });
//         return response.data; // Return the response data (list of events)
//     } catch (error) {
//         console.error('Error fetching events:', error);
//         throw error; // Rethrow the error
//     }
// };
