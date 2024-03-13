import express from "express";
import { login, logout, register } from "../controllers/authController.js";

// All routes are after /api/auth
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;
