import { Router } from "express";
import healthRoutes from "./health-routes";

// Initialize router
export const router = Router();

// Register routes
router.use("/health", healthRoutes);
// Add more routes as needed, for example:
// router.use('/users', userRoutes);
// router.use('/auth', authRoutes);

// Default route
router.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

router.post("/", (req, res) => {
  // If app.use(express.json()) is not used, req.body will be undefined. You can print it here.
  console.log(req.body);
  res.json({ message: "API is running" });
});

export default router;
