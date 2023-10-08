import { Router } from "express";
import { editUser, getUser, loginUser, signupUser } from "../controllers/user.js";
import Auth from "../middleware/Auth.js";

const router = Router();

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.route("/profile").get(Auth, getUser).patch(Auth, editUser);

export default router;
