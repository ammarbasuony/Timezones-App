import bcrypt from "bcrypt";

// Models
import { User } from "../models/index.js";

// Functions
import { isEmpty } from "../helpers/functions.js";

export const addUser = async (req, res) => {
  const data = req.body;

  try {
    if (isEmpty(User.rowAttributes, data)) {
      res
        .status(400)
        .json({ success: false, message: "All attributes are required" });
      return;
    }

    // Check if the username already exists
    const checkUser = await User.findOne({
      where: {
        email,
      },
    });

    if (checkUser) {
      res
        .status(400)
        .json({ success: false, message: "User is already exists" });
      return;
    }

    // Generate Salt
    const salt = await bcrypt.genSalt();

    // Hash The Password
    const hashedPass = await bcrypt.hash(data.password, salt);

    const user = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPass,
    });

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
