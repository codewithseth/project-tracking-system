import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET /api/v1/users - Retrieve all users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/users/:id - Retrieve a user by ID
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/users - Create a new user
router.post("/", async (req, res, next) => {
  const { username, password } = req.body || {}; // Add default empty object to prevent destructuring error

  if (!username || !password) {
    res.status(400);
    throw new Error("Username and password are required");
  }

  try {
    const newUser = await User.create(username, password);
    res.json(newUser);
  } catch (error) {
    next(error);
  }
});

// PUT /api/v1/users/:id/username - Update a user's username
router.put("/:id/username", async (req, res, next) => {
  const { id } = req.params;
  const { newUsername } = req.body || {};

  if (!newUsername) {
    res.status(400);
    throw new Error("New username is required");
  }

  try {
    const updatedUser = await User.updateUsername(id, newUsername);
    if (updatedUser === 0) {
      res.status(404);
      throw new Error("User not found");
    }
    res.json({ message: "Username updated successfully" });
  } catch (error) {
    next(error);
  }
});

// PUT /api/v1/users/:id/password - Update a user's password
router.put("/:id/password", async (req, res, next) => {
  const { id } = req.params;
  const { newPassword } = req.body || {};

  if (!newPassword) {
    res.status(400);
    throw new Error("New password is required");
  }

  try {
    const updatedUser = await User.updatePassword(id, newPassword);
    if (updatedUser === 0) {
      res.status(404);
      throw new Error("User not found");
    }
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/v1/users/:id - Delete a user
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  try {
    const deletedUser = await User.delete(id);
    if (deletedUser === 0) {
      res.status(404);
      throw new Error("User not found");
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;
