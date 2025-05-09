import { Router, Request, Response } from "express";

const router = Router();

/**
 * GET /health
 * @description Health check endpoint to verify API is running
 */
router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export default router;
