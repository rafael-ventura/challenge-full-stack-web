import {Router} from "express";
import studentRouter from "./StudentRoutes";
import authRouter from "./AuthenticateRoutes";
import userRouter from "./UserRoutes";

const router = Router();

router.use("/students", studentRouter);
router.use("/auth", authRouter);
router.use("/users", userRouter);
export default router;
