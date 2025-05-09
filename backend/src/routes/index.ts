import { Router } from "express";
import healthRoutes from "./health-routes";

// Initialize router
export const router = Router();

// Register routes
router.use("/health", healthRoutes);

// Register other routes for login, register, etc.

export default router;
