import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";
import User from "../models/user.js";

dotenv.config();

export const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const tokenData = await axios.get("http://localhost:8000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (tokenData.status >= 200 && tokenData.status <= 300) {
      const userData = tokenData.data;
      req.user = userData;

      let user = await User.findOne({ email: userData.email });
      if (!user) {
        let mappedRole;
        switch (userData.role) {
          case 'user':
            mappedRole = 'client';
            break;
          case 'courtier':
            mappedRole = 'courtier';
            break;
          case 'assistant':
            mappedRole = 'assistant';
            break;
          default:
            mappedRole = userData.role;
        }
        
        if (!['assistant', 'courtier', 'client'].includes(mappedRole)) {
          return res.status(400).json({ message: `Invalid role: ${mappedRole}` });
        }
        
        const newUser = new User({
          NomComplet: userData.nom + " " + userData.prenom,
          email: userData.email,
          role: mappedRole,
          token: token,
        });
        user = await newUser.save();
      }

      next();
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return res.status(500).json({ message: "Token verification failed", error: error.message });
  }
};
