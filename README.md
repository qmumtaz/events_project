# Welcome to Events
The Events platform is a space where the community can view and manage events, organized in a user-friendly way. It integrates the Eventbrite API and Firebase for a seamless event management experience.

# Features
- View and Book Events: Any user, staff, or guest can browse events, view detailed information, purchase tickets, and add events to their Google Calendar.
- Event Management for Staff: Staff members can create, update, publish, cancel events, and manage event details through an integrated calendar view.
- User Access: Users can access the calendar feature to view events, even without a Google account.

- Authentication: Log in with an email address, where users with emails ending in @eventstaff are designated as staff.

# Technologies Used
- Eventbrite API for managing events.
- Firebase for user authentication and data storage.
- Axios for API requests.
- React Big Calendar for calendar display.
- Bootstrap for responsive UI design.

Access the website that is hosted on : ...................


# Eventbrite API Integration

1. Create an Eventbrite Account: Sign up at Eventbrite to get your API key. You can generally find at this page if you have signed up for it - https://www.eventbrite.com/platform/api-keys.

2. Get Your Private Token: Retrieve your private API token from the Eventbrite Developer Console.

3. Find Your Organization ID: Use the following command with your private token to get your organization details:

```` javascript
curl -i -X GET "https://www.eventbriteapi.com/v3/users/me/organizations/" -H "Authorization: Bearer YOUR_PRIVATE_TOKEN"
```` 

Example response:


```` javascript
{
    "organizations": [
        {
            "_type": "organization",
            "name": "YOUR NAME",
            "id": "YOUR_ID"
        }
    ]
}

# You will need this organisation id and store this with in your .env file this is explained later.
```` 

4. Manage Events: Use the Eventbrite platform or the API to manage your events, including creating, updating, and deleting events. You will need to have an eventsbrite to do this. 




# Firebase 

To sign up to firebase naviagte to this link -   https://console.firebase.google.com/ 

1. Create a Firebase Project: Log in to the Firebase Console, create a new project, and navigate to Authentication > Sign-in method to set up sign-in options.

2. Add Your Web App: Go to Project Settings > Your Apps and select the </> icon to create a web app. You will get the Firebase configuration details needed for your project.

3. Initialize Firebase: Install Firebase SDK and initialize it in your project:

```` javascript
npm install firebase

````

Example configuration file

```` javascript
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

# You will see this after you have created a web app project within firebase for your sdk.

````

4. Firestore Database: Navigate to Firestore Database under the Build section and create a database for storing user and event information. Set up rules to ensure secure access:

```` javascript
service cloud.firestore {
    match /databases/{database}/documents {
        match /users/{userId} {
            allow read, write: if request.auth != null && request.auth.uid == userId;

            match /events/{eventId} {
                allow read, write: if request.auth != null && request.auth.uid == userId;
            }
        }
    }
}


````

# Environment Variables

Create a .env file in the root of your project to store sensitive information like API keys and configuration settings:

```` javascript

REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_EVENTBRITE_API_KEY=your_eventbrite_api_key
REACT_FIREBASE_API=your_firebase_api_key
REACT_FIREBASE_AUTH=your_firebase_auth
REACT_FIREBASE_PROJECT_ID=firebase_project_id
REACT_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messager_id
REACT_FIREBASE_APP_ID=your_firebase_app_id
REACT_FIREBASE_MEASUREMENT_ID=your_firebase_measurment_id

````
