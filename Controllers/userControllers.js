import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import User from "../Models/user.js";

import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    // Check if user with the same email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Store hashed password in database
    });

    // Save the user to the database
    await newUser.save();

    // Create JWT payload
    const payload = {
      user: {
        id: newUser.id,
      },
    };

    // Sign JWT token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          console.error("JWT signing error:", err.message);
          return res.status(500).json({ error: "Failed to create token" });
        }
        res.json({ token });
      }
    );
  } catch (error) {
    console.log("Register error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Validate password
    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role, // Include any other relevant user information
      },
    };

    // Sign JWT token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          console.log("JWT signing error:", err.message);
          return res.status(500).json({ message: "Failed to create token" });
        }
        res
          .status(200)
          .cookie("access_Token", token, {
            httpOnly: true,
          })
          .json({ message: "user login succefully" });
      }
    );
  } catch (error) {
    next(error);
    console.log("Login error:", error.message);
    res.status(500).json({ message: "Login Failed Internal server error" });
  }
};

export const google = async (req, res, next) => {
  const { email, name, profilepict } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const payload = {
        user: {
          id: user.id,
          email: user.email,
          role: user.role, // Include any other relevant user information
        },
      };
      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) {
            console.log("JWT signing error:", err.message);
            return res.status(500).json({ message: "Failed to create token" });
          }
          res
            .status(200)
            .cookie("access_Token", token, {
              httpOnly: true,
            })
            .json({ message: "user login succefully" });
        }
      );
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(+8);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = new User({
        name:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: profilepict,
      });
      await newUser.save();
      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) {
            console.log("JWT signing error:", err.message);
            return res.status(500).json({ message: "Failed to create token" });
          }
          res
            .status(200)
            .cookie("access_Token", token, {
              httpOnly: true,
            })
            .json({ message: "user login succefully" });
        }
      );
    }
  } catch (error) {
    next(error);
  }
};
