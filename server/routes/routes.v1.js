import Router from "express";

import userController from "../controllers/UserController";
import authValidator from "../middleware/AuthValidator";

const router = Router();

// Auth routes
router.post("/api/v1/auth/signup", authValidator.validateSignUp, userController.signUp);
router.post("/api/v1/auth/signin", authValidator.validateSignIn, userController.signIn);

// Incident routes

export default router;