import Sequelize, { DataTypes } from "sequelize";
import db from "../config/db.js";

// Import Schemas
import UserSchema from "./user.js";

// Create Models
const User = UserSchema(db, DataTypes);

db.sync({ force: false })
  .then(() => {
    console.log("Tables Created");
  })
  .catch((err) => {
    console.log(err);
  });

export { User };