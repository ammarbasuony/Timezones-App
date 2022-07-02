import bcrypt from "bcrypt";

// Models
import { User } from "../models/index.js";

// Functions
import {
  isEmpty,
  isRecordExists,
  isValidEmail,
  isValidRole,
} from "../helpers/functions.js";

export const index = async (req, res) => {
  try {
    const users = await User.findAll();

    // Delete Passwords From The Users
    for (let i = 0; i < users.length; i++) {
      delete users[i].dataValues.password;
    }

    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not exists" });

    // Delete Password From The Response
    delete user.dataValues.password;

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const addUser = async (req, res) => {
  const data = req.body;

  try {
    if (isEmpty(User.rawAttributes, data))
      return res
        .status(400)
        .json({ success: false, message: "All attributes are required" });

    if (await isRecordExists(User, { email: data.email }))
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    if (!isValidEmail(data.email))
      return res
        .status(400)
        .json({ success: false, message: "Email not valid" });

    if (!isValidRole(data.role))
      return res
        .status(400)
        .json({ success: false, message: "Role not valid" });

    if (data.password.trim().length === 0)
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });

    // Generate Salt
    const salt = await bcrypt.genSalt();

    // Hash The Password
    const hashedPass = await bcrypt.hash(data.password, salt);

    const user = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPass,
      role: data.role,
    });

    delete user.dataValues.password;

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not exists" });

    // Check if the email already exists
    const isEmailExists = await isRecordExists(User, { email: data.email });

    if (isEmailExists && user.email !== data.email)
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });

    if (!isValidEmail(data.email))
      return res
        .status(400)
        .json({ success: false, message: "Email not valid" });

    if (!isValidRole(data.role))
      return res
        .status(400)
        .json({ success: false, message: "Role not valid" });

    if (data.password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password, salt);
    }

    user.update(data);

    // Delete Password From The Response
    const { password, ...userData } = user.dataValues;

    res.status(201).json({ success: true, data: userData });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.destroy({
      where: {
        id,
      },
    });

    if (!user) {
      res.status(404).json({ success: false, message: "User not exists" });
      return;
    }

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
