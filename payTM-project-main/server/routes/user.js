// this is the subroute after /user/.
import express from "express";
import { getAllUsers,signup,signinController } from "../controllers/userController.js";
import { authMiddleware } from '../middleware/token.js';

const userRouter = express.Router();

userRouter.post("/signup",signup);
userRouter.post("/signin",signinController);
userRouter.get("/bulk", authMiddleware,getAllUsers);

export default userRouter;