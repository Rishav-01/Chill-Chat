import userModel from "../models/User.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    let { username, password, gender } = req.body;
    console.log(req.body);

    let boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    let girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    let profilePicture;

    if (gender === "male") {
      profilePicture = boyProfilePic;
    } else {
      profilePicture = girlProfilePic;
    }

    let newUser = await userModel.create({
      username,
      password,
      gender,
      profilePicture,
    });
    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      username,
      profilePicture,
    });
  } catch (error) {
    res.status(500).json({ error: "Username already exists" });
  }
};

export const login = async (req, res) => {
  let { username, password: enteredPassword } = req.body;
  try {
    let user = await userModel.findOne({ username });
    if (!user) {
      res.status(404).json({ error: "User not found!" });
    } else if (enteredPassword !== user.password) {
      res.status(400).json({ error: "Wrong password" });
    } else {
      generateTokenAndSetCookie(user._id, res);
      res.json({
        _id: user._id,
        username,
        profilePicture: user.profilePicture,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json("Logged Out Successfully");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
