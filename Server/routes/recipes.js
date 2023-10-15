import { Router } from "express";
import {
  addRecipes,
  getAllRecipes,
  getUsersRecipes,
} from "../controllers/recipes.js";
import Auth from "../middleware/Auth.js";

const router = Router();

//require auth for all routes
router.use(Auth);

router.route("/explore").get(getAllRecipes);
router.route("/profile").get(getUsersRecipes).post(addRecipes);

export default router;
