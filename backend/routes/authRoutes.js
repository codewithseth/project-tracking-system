import express from "express";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import { jwtVerify } from "jose";
import { JWT_SECRET } from "../utils/getJwtSecret.js";

const router = express.Router();

// POST /api/v1/auth/login - User login
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body || {};

    // Validate input
    if (!username || !password) {
      res.status(400);
      throw new Error("Username and password are required");
    }

    // Fetch user by username
    const user = await User.findByUsername(username);
    if (!user) {
      res.status(401);
      throw new Error("Invalid username or password");
    }

    // Verify password
    const isPasswordValid = await User.verifyPassword(password, user.pwd_hash);
    if (!isPasswordValid) {
      res.status(401);
      throw new Error("Invalid username or password");
    }

    // Generate JWT token
    const payload = { userId: user.id };
    const accessToken = await generateToken(payload, "1m"); // Access token valid for 1 minute
    const refreshToken = await generateToken(payload, "5d"); // Refresh token valid for 5 days

    // Set refresh token in HTTP-Only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
      domain: "https://project-tracking-system-zcy4.vercel.app",
    });

    // Return tokens and user info (excluding password hash)
    res.json({
      accessToken,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/auth/refresh - Refresh access token
router.post("/refresh", async (req, res, next) => {
  try {
    // Get refresh token from HTTP-Only cookie
    const token = req.cookies?.refreshToken;

    if (!token) {
      res.status(401);
      throw new Error("Refresh token not found");
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);

    const user = await User.findById(payload.userId);

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const newAccessToken = await generateToken({ userId: user.id }, "1m");

    res.json({
      accessToken: newAccessToken,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(401);
    next(error);
  }
});

// POST /api/v1/auth/logout - User logout
router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
