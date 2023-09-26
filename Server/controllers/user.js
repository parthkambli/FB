import bcrypt from "bcrypt";
import validator from "validator";
import User from "../models/User.js";

// -----------------------------------------------------------------------------------------------
// @desc - signup user
// @route - POST /api/users
// -----------------------------------------------------------------------------------------------
export const signupUser = async (req, res) => {
  const { Full_Name, User_Name, Email, Password, Confirm_Password } = req.body;

  try {
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

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: Object.values(error.errors).map((val) => val.message),
      });
    } else if (error.code === 11000) {
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

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
