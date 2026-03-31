import pool from "../config/db.js";
import bcrypt from "bcryptjs";

class User {
  static async findAll() {
    try {
      const [users] = await pool.query(
        "SELECT id, username, pwd_hash FROM users",
      );
      return users;
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  static async findById(id) {
    try {
      const [users] = await pool.query(
        "SELECT id, username, pwd_hash FROM users WHERE id = ?",
        [id],
      );
      return users[0];
    } catch (error) {
      throw new Error(`Error fetching user by ID: ${error.message}`);
    }
  }

  static async create(username, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await pool.query(
        "INSERT INTO users (username, pwd_hash) VALUES (?, ?)",
        [username, hashedPassword],
      );
      return {
        id: result.insertId,
        username,
      };
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  static async updateUsername(id, newUsername) {
    try {
      const [result] = await pool.query(
        "UPDATE users SET username = ? WHERE id = ?",
        [newUsername, id],
      );
      if (result.affectedRows === 0) {
        throw new Error("User not found");
      }
      return { id, username: newUsername };
    } catch (error) {
      throw new Error(`Error updating username: ${error.message}`);
    }
  }

  static async updatePassword(id, newPassword) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const [result] = await pool.query(
        "UPDATE users SET pwd_hash = ? WHERE id = ?",
        [hashedPassword, id],
      );
      if (result.affectedRows === 0) {
        throw new Error("User not found");
      }
      return { message: "Password updated successfully" };
    } catch (error) {
      throw new Error(`Error updating password: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
      if (result.affectedRows === 0) {
        throw new Error("User not found");
      }
      return { message: "User deleted successfully" };
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      throw new Error(`Error verifying password: ${error.message}`);
    }
  }
}

export default User;
