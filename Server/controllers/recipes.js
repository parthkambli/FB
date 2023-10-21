import mongoose from "mongoose";
import Recipe from "../models/recipes.js";

// Function to shuffle an array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// -----------------------------------------------------------------------------------------------
// @desc - get all Recipes
// @route - GET /api/recipes/explore
// -----------------------------------------------------------------------------------------------
export const getAllRecipes = async (req, res) => {
  try {
    const recipesBeforeShuffle = await Recipe.find({}) // Find all recipes
      .populate({
        path: "user_id",
        model: "User",
        select: "User_Name Profile_Picture",
      });

    // Shuffle the array of recipes
    const recipes = shuffleArray(recipesBeforeShuffle);

    return res
      .status(200)
      .json({ success: true, count: recipes.length, data: recipes });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// -----------------------------------------------------------------------------------------------
// @desc - get single Recipes
// @route - GET /api/recipes/:id
// -----------------------------------------------------------------------------------------------
export const getSingleRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    // Check for mongoose valid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ success: false, error: "Recipe Not Found" });
    }

    // Use the populate method to fetch user data along with the recipe
    const recipe = await Recipe.findById(id).populate({
      path: "user_id",
      model: "User",
      select: "User_Name Profile_Picture",
    });

    // Check for the existence of the recipe
    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, error: "Recipe Not Found" });
    }

    res.status(200).json({ success: true, data: recipe });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

// -----------------------------------------------------------------------------------------------
// @desc - add Recipes
// @route - POST /api/recipes
// -----------------------------------------------------------------------------------------------
export const addRecipes = async (req, res) => {
  try {
    const user_id = req.user._id;
    const recipeData = {
      ...req.body,
      user_id,
    };

    const recipe = await Recipe.create(recipeData);
    return res.status(200).json({ success: true, data: recipe });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: Object.values(error.errors).map((val) => val.message),
      });
    } else {
      return res
        .status(500)
        .json({ success: false, error: "Server Error", Error: error });
    }
  }
};
