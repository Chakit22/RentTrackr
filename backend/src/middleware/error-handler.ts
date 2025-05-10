import { Request, Response, NextFunction } from "express";

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  statusCode: number;

  /**
   * Creates a new API error
   * @param message - Error message
   * @param statusCode - HTTP status code
   */
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global error handling middleware
 * @param err - Error object
 * @param req - Express request
 * @param res - Express response
 * @param next - Express next function
 */
export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = "statusCode" in err ? err.statusCode : 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
    },
  });
};
