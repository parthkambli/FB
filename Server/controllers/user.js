import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Recipes from "../models/recipes.js";

// Create token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// -----------------------------------------------------------------------------------------------
// @desc - signup user
// @route - POST /api/users
// -----------------------------------------------------------------------------------------------
export const signupUser = async (req, res) => {
  const { Full_Name, User_Name, Email, Password, Confirm_Password } = req.body;

  try {
    if (!Full_Name) {
      throw Error("name can not be empty!");
    }
    if (!User_Name) {
      throw Error("User name can not be empty!");
    }
    if (!Email) {
      throw Error("email can not be empty!");
    }

    if (!Password) {
      throw Error("password can not be empty!");
    }

    if (!Confirm_Password) {
      throw Error("confirm password can not be empty!");
    }

    if (!validator.isEmail(Email)) {
      throw Error("Email is not valid!");
    }

    if (!validator.isStrongPassword(Password)) {
      throw Error(
        "password is not strong enough! password should have atleast 1 upercase, 1 lowercase, 1 number, 1 symbol and it should be atleast 8 charecters long."
      );
    }

    if (!validator.equals(Password, Confirm_Password)) {
      throw Error("Password and confirm passward dose not match! please retry");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(Password, salt);

    const user = await User.create({
      Full_Name,
      User_Name,
      Email,
      Password: hash,
    });

    const token = createToken(user._id);

    return res.status(200).json({ success: true, data: user, token: token });
  } catch (error) {
    if (error.code === 11000) {
      const fieldName = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        success: false,
        error: `${fieldName} already exists. Please try a different ${fieldName}.`,
      });
    } else {
      return res.status(400).json({ success: false, error: error.message });
    }
  }
};

// -----------------------------------------------------------------------------------------------
// @desc - login user
// @route - POST /api/users
// -----------------------------------------------------------------------------------------------
export const loginUser = async (req, res) => {
  const { Email, Password } = req.body;
  try {
    if (!Email) {
      throw Error("email can not be empty!");
    }

    if (!Password) {
      throw Error("password can not be empty!");
    }

    const user = await User.findOne({ Email });

    if (!user) {
      throw Error("Invalid credentials!");
    }

    const match = await bcrypt.compare(Password, user.Password);

    if (!match) {
      throw Error("Incorrect credential!");
    }

    const token = createToken(user._id); // create token

    return res.status(200).json({ success: true, data: user, token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// -----------------------------------------------------------------------------------------------
// @desc - get user
// @route - PUT /api/users/Profile
// -----------------------------------------------------------------------------------------------
export const getLogedInUser = async (req, res) => {
  try {
    // Get the authenticated user's ID from the token
    const userId = req.user._id;

    // Query the database to find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    // Get recipes of this user
    const recipes = await Recipes.find({ user_id: user._id });

    // If the user is found, return their information
    return res.status(200).json({ success: true, data: { user, recipes } });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// -----------------------------------------------------------------------------------------------
// @desc - get user
// @route - PUT /api/users/Profile
// -----------------------------------------------------------------------------------------------
export const getUser = async (req, res) => {
  // Get the user_name from params
  const { user_name } = req.params;

  try {
    // Query the database to find the user by their User_name
    const user = await User.findOne({ User_Name: user_name });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const recipes = await Recipes.find({ user_id: user._id });

    // If the user is found, return their information
    return res.status(200).json({ success: true, data: { user, recipes } });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// -----------------------------------------------------------------------------------------------
// @desc - edit user
// @route - PUT /api/users/Profile
// -----------------------------------------------------------------------------------------------
export const editUser = async (req, res) => {
  const { Profile_Picture, Bio, Full_Name, User_Name } = req.body;

  try {
    // Get the authenticated user's ID from the token
    const userId = req.user._id;

    if (!Full_Name) {
      throw Error("Name can not be empty!");
    }
    if (!User_Name) {
      throw Error("User name can not be empty!");
    }

    // Create an object with the fields you want to update
    const updatedUserFields = {
      Profile_Picture,
      Bio,
      Full_Name,
      User_Name,
    };

    const user = await User.findByIdAndUpdate(
      userId,
      { ...updatedUserFields },
      { new: true } // Return the updated user
    );

    // Check for existence of the user
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    return res.status(200).json({
      success: true,
      data: user,
      message: "Profile Edited Successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
