import bcrypt from "bcrypt";

// Models
import { User } from "../models/index.js";

// Functions
import { isEmpty, isRecordExists, isValidEmail } from "../helpers/functions.js";

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
        .json({ success: false, message: "User is already exists" });

    if (!isValidEmail(data.email))
      return res
        .status(400)
        .json({ success: false, message: "Email is not valid" });

    // Generate Salt
    const salt = await bcrypt.genSalt();

    // Hash The Password
    const hashedPass = await bcrypt.hash(data.password, salt);

    const user = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPass,
    });

    delete user.dataValues.password;

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
