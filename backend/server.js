// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { auth } from "./src/config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const app = express();
const port = 3000;

// For dotenv files
dotenv.config();

// Allow all origins
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
  res.send("Hello from Node.js Server!");
});

// route for firebase authentication
app.post("auth/signup", async (req, res) => {
  try {
    const { email, password } = await req.body();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User :", userCredential.user);
    console.log("User sucessfully signed up!");
  } catch (err) {}
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
