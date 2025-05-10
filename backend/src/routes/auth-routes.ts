import { Router, Request, Response, NextFunction } from "express";
import { auth, getCurrentUser } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const router = Router();

/**
 * POST /auth/signup
 * @description Sign up endpoint to create a new user
 */
router.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      res.status(200).json({
        status: "success",
        message: "User created successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /auth/signin
 * @description Sign in endpoint to authenticate a user
 */
router.post(
  "/signin",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log("signin");
      const { email, password } = req.body;

      // Check if user is already signed in using our centralized auth state
      const currentUser = getCurrentUser();
      // console.log("currentUser", currentUser);
      if (currentUser) {
        // Redirect to dashboard
        res.status(200).json({
          status: "success",
          message: "User is already signed in",
          user: currentUser,
        });

        // console.log("before return");
        return;
      }

      // console.log("before signin");
      // If not signed in, proceed with sign in
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log("after signin");

      const user = userCredential.user;

      res.status(200).json({
        status: "success",
        message: "User signed in successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /auth/signout
 * @description Sign out endpoint to log out a user
 */
router.post(
  "/signout",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await signOut(auth);
      res.status(200).json({
        status: "success",
        message: "User signed out successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
