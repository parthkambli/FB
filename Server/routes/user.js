import { Router } from "express";
import { editUser, loginUser, signupUser } from "../controllers/user.js";
import Auth from "../middleware/Auth.js";

const router = Router();

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.route("/edituser").patch(Auth, editUser);

export default router;
