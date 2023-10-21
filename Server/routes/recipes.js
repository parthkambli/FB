import { Router } from "express";
import {
  addRecipes,
  getAllRecipes,
  getSingleRecipe,
} from "../controllers/recipes.js";
import Auth from "../middleware/Auth.js";

const router = Router();

//require auth for all routes
router.use(Auth);

router.route("/explore").get(getAllRecipes);
router.route("/profile").post(addRecipes);
router.route("/profile/:user_id")
router.route("/:id").get(getSingleRecipe);

export default router;
