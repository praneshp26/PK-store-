import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW9PcZWcF2bUCqX-WE9b_A2ABBlfZ0_g4",
  authDomain: "e-commerce-63cd6.firebaseapp.com",
  projectId: "e-commerce-63cd6",
  storageBucket: "e-commerce-63cd6.firebasestorage.app",
  messagingSenderId: "842926943737",
  appId: "1:842926943737:web:c25e0f477e8b35699c6128",
  measurementId: "G-1FFYD1BF9E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
