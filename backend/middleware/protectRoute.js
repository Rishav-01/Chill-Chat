import jwt from "jsonwebtoken";
import userModel from "../models/User.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "No token, Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Token", decoded);

    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const user = await userModel.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Server error");
    res.status(500).json({ error: "Server Error" });
  }
};

export default protectRoute;
