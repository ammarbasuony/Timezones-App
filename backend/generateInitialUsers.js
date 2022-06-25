import bcrypt from "bcrypt";

// Model
import { User } from "./models/index.js";

// Functions
import { isRecordExists } from "./helpers/functions.js";

(async () => {
  try {
    if (await isRecordExists(User, { email: "admin@admin.com" }))
      return console.log("Users already exists");

    const salt = await bcrypt.genSalt();

    const users = [
      {
        name: "Admin",
        email: "admin@admin.com",
        password: await bcrypt.hash("admin", salt),
        role: 2,
      },
      {
        name: "Manager",
        email: "manager@manager.com",
        password: await bcrypt.hash("manager", salt),
        role: 1,
      },
    ];

    await User.bulkCreate(users);
    console.log("Users created");
  } catch (error) {
    console.log(error);
  }
})();
