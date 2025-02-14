import {Router} from "express";
import {AuthenticateController} from "../controllers/AuthenticateController";
import {asyncHandler} from "../middlewares/asyncHandler";

const router = Router();

router.post("/login", asyncHandler(AuthenticateController.login));
router.post("/register", asyncHandler(AuthenticateController.register));

export default router;
