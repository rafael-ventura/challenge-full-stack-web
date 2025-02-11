import { Router } from "express";
import studentRouter from "./StudentRoutes";

const router = Router();

router.use("/students", studentRouter);

export default router;
