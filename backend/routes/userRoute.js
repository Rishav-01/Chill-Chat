import express from "express";
import { getUsers } from "../controllers/userController.js";
import protectRoute from "../middleware/protectRoute.js";

const userRouter = express.Router();

// All routes after /api/users
userRouter.get("/", protectRoute, getUsers);

export default userRouter;
