import bcrypt from "bcrypt";

// Models
import { User } from "../models/index.js";

// Functions
import { isEmpty, isRecordExists, isValidEmail } from "../helpers/functions.js";
import createToken from "../helpers/createToken.js";

export const signup = async (req, res) => {
  const data = req.body;
  const { role, ...otherAttributes } = User.rawAttributes;

  try {
    if (isEmpty(otherAttributes, data))
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

    // Generate Salt
    const salt = await bcrypt.genSalt();

    // Hash The Password
    const hashedPass = await bcrypt.hash(data.password, salt);

    const user = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPass,
      role: 0,
    });

    delete user.dataValues.password;

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Incorrect email" });

    // Check if password matches the one stored in the DB
    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });

    const token = createToken({ id: user.id, role: user.role });

    delete user.dataValues.password;

    res.json({ success: true, data: user, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
