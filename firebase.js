import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBGa-WOowb4juWt77J9V2GxRfLrVHhZCv0",
    authDomain: "eventsproject-9317c.firebaseapp.com",
    projectId: "eventsproject-9317c",
    storageBucket: "eventsproject-9317c.appspot.com",
    messagingSenderId: "471538281460",
    appId: "1:471538281460:web:ce4919a9803b73d50927a1",
    measurementId: "G-4GGFMKR0EV"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const db = getFirestore(app); 

export { auth, db };


