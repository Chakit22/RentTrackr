// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import dotenv from "dotenv";

dotenv.config();

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// console.log(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Current user state
let currentUser: User | null = null;

/**
 * Sets up a persistent auth state listener
 * @returns Function to unsubscribe the listener
 */
const setupAuthListener = () => {
  console.log("Setting up Firebase auth state listener...");

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    console.log("Auth state changed:");
    // Update the current user variable whenever auth state changes
    currentUser = user;

    if (user) {
      console.log(`User authenticated: ${user.email} (${user.uid})`);
    } else {
      console.log("No user is authenticated");
    }
  });

  return unsubscribe;
};

/**
 * Get the current authenticated user
 * @returns The current user or null if not authenticated
 */
const getCurrentUser = () => {
  // console.log("Getting current user:", currentUser);
  return currentUser;
};

export { app, auth, setupAuthListener, getCurrentUser };
