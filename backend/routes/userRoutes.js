import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET /api/v1/users - Retrieve all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/v1/users/:id - Retrieve a user by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/v1/users - Create a new user
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }
  try {
    const newUser = await User.create(username, password);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/v1/users/:id/username - Update a user's username
router.put("/:id/username", async (req, res) => {
  const { id } = req.params;
  const { newUsername } = req.body;
  if (!newUsername) {
    return res.status(400).json({ error: "New username is required" });
  }
  try {
    const updatedUser = await User.updateUsername(id, newUsername);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/v1/users/:id/password - Update a user's password
router.put("/:id/password", async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;
  if (!newPassword) {
    return res.status(400).json({ error: "New password is required" });
  }
  try {
    const updatedUser = await User.updatePassword(id, newPassword);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/v1/users/:id - Delete a user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.delete(id);
    if (deletedUser) {
      res.json(deletedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
