import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = "test";

export const signin = async (req, res) => {
  const { email, password } = req.body; //Get email and password from frontend

  try {
    const oldUser = await UserModal.findOne({ email }); //He must have registered email
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password); //Check if passwords are same.

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    }); //Create a jwt token for him

    res.status(200).json({ result: oldUser, token }); //Send the old user and token created
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body; //First we are getting all the info from frontend i.e registration form using req.body
  try {
    const oldUser = await UserModal.findOne({ email }); //We'll check if there is already a user with same email the return

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12); //bcrypt

    const result = await UserModal.create({
      //Create new modal
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`, //Nmae will be comb of both first and last
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    }); //Token is created which will automatically expire in 1 hr
    res.status(201).json({ result, token }); //We'll now send the new user as result and token created
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const googleSignIn = async (req, res) => {
  const { email, name, token, googleId } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });
    if (oldUser) {
      const result = { _id: oldUser._id.toString(), email, name };
      return res.status(200).json({ result, token });
    }

    const result = await UserModal.create({
      email,
      name,
      googleId,
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
