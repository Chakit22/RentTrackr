import express from "express";
import cors from "cors";
import { router } from "./routes/index";
import { errorHandler } from "./middleware/error-handler";
import { setupAuthListener } from "./config/firebase";

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Firebase Auth listener
const authUnsubscribe = setupAuthListener();

// Middleware

// This makes the data in the body of the request available in the req.body object.
// Without that req.body would be undefined.
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// This allows from all origins unless you add options
app.use(cors());

// Routes
// This mounts all routes defined in your router will be mounted under the "/api" prefix
app.use("/api", router);

// Error handling

// This is a global error handler and when an error is thrown and we write next(error)
// This will catch the error as this is the next function in the middleware stack.
app.use(errorHandler);

// Listens for incoming requests on the specified port.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Clean up the auth listener when the server is terminated
process.on("SIGINT", () => {
  console.log("Server shutting down, cleaning up Firebase auth listener...");
  authUnsubscribe();
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("Server shutting down, cleaning up Firebase auth listener...");
  authUnsubscribe();
  process.exit(0);
});

export default app;
