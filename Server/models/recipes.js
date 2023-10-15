import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  user_id: {
    type: String,
    rerquire: [true, "user id is required!"],
  },
  Recipe_Title: {
    type: String,
    trim: true,
    required: [true, "Recipe name can not be empty!"],
  },
  Recipe_Type: [
    {
      type: String,
      trim: true,
      required: [true, "Recipe type can not be empty!"],
    },
  ],
  Ingredients: [
    {
      type: String,
      trim: true,
      required: [true, "Ingredients can not be empty!"],
    },
  ],
  Recipe: {
    type: String,
    trim: true,
    required: [true, "Recipe can not be empty!"],
  },
  Recipe_Image: {
    type: String,
  },
});

export default mongoose.model("Recipe", recipeSchema);
