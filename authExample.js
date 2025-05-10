// Example of using onAuthStateChanged in a Node.js environment
const { initializeApp } = require("firebase/app");
const {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} = require("firebase/auth");

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Set up auth state listener once at app initialization
function setupAuthListener() {
  // This sets up a persistent listener for auth state changes
  const unsubscribe = onAuthStateChanged(
    auth,
    (user) => {
      if (user) {
        // User is signed in
        console.log("User is currently signed in:", user.email);
        console.log("User ID:", user.uid);
      } else {
        // User is signed out
        console.log("No user is currently signed in");
      }
    },
    (error) => {
      console.error("Auth state change error:", error);
    }
  );

  // You can call unsubscribe() when you no longer want to listen for changes
  // unsubscribe();

  return unsubscribe;
}

// Example function to handle sign in with check
async function signInUser(email, password) {
  try {
    // First check if a user is already signed in
    const currentUser = auth.currentUser;

    if (currentUser) {
      console.log("A user is already signed in:", currentUser.email);
      console.log("Please sign out first before signing in as another user");
      return currentUser;
    }

    // If no user is signed in, proceed with sign in
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User signed in successfully:", userCredential.user.email);
    return userCredential.user;
  } catch (error) {
    console.error("Sign in error:", error.code, error.message);
    throw error;
  }
}

// Example function to sign out user
async function signOutUser() {
  try {
    // Check if there's a user to sign out
    if (!auth.currentUser) {
      console.log("No user is currently signed in");
      return;
    }

    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Sign out error:", error.code, error.message);
    throw error;
  }
}

// Get current user synchronously (might be null if auth is not initialized)
function getCurrentUser() {
  const user = auth.currentUser;
  if (user) {
    return {
      email: user.email,
      uid: user.uid,
      displayName: user.displayName,
    };
  }
  return null;
}

// Get current user asynchronously (recommended way)
function getCurrentUserAsync() {
  return new Promise((resolve, reject) => {
    // This is a one-time check (with immediate unsubscribe)
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe(); // Immediately unsubscribe
        resolve(user);
      },
      (error) => {
        unsubscribe(); // Immediately unsubscribe
        reject(error);
      }
    );
  });
}

// Set up auth listener at app startup
const authUnsubscribe = setupAuthListener();

// Example usage
async function runExample() {
  try {
    // Check current user asynchronously (reliable way)
    const initialUser = await getCurrentUserAsync();
    console.log(
      "Initial auth check:",
      initialUser ? "User signed in" : "No user signed in"
    );

    // Example of signing in (won't proceed if user is already signed in)
    await signInUser("user@example.com", "password123");

    // Later in your app, you can get the current user
    const user = getCurrentUser();
    console.log("Current user:", user);

    // Sign out example
    await signOutUser();
  } catch (error) {
    console.error("Example error:", error);
  } finally {
    // Cleanup auth listener when app exits
    authUnsubscribe();
  }
}

// Run the example
// runExample();

module.exports = {
  setupAuthListener,
  signInUser,
  signOutUser,
  getCurrentUser,
  getCurrentUserAsync,
};
