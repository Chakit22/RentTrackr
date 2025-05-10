import { Router } from "express";
import healthRoutes from "./health-routes";
import authRoutes from "./auth-routes";

// Initialize router
export const router = Router();

// Register routes
router.use("/health", healthRoutes);

// Register other routes for login, register, etc.
router.use("/auth", authRoutes);

export default router;
