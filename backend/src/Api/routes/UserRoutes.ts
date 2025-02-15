import {Router} from "express";
import {AuthenticateController} from "../controllers/AuthenticateController";
import {asyncHandler} from "../middlewares/asyncHandler";

const router = Router();

router.get("", asyncHandler(AuthenticateController.getUser));

export default router;
