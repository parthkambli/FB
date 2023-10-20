import { Router } from "express";
import {
  editUser,
  getLogedInUser,
  getUser,
  loginUser,
  signupUser,
} from "../controllers/user.js";
import Auth from "../middleware/Auth.js";

const router = Router();

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.route("/profile").get(Auth, getLogedInUser).patch(Auth, editUser);
router.route("/:user_name").get(Auth, getUser);

export default router;
