import Sequelize, { DataTypes } from "sequelize";
import db from "../config/db.js";

// Import Schemas
import UserSchema from "./User.js";
import TimezoneSchema from "./Timezone.js";

// Create Models
const User = UserSchema(db, DataTypes);
const Timezone = TimezoneSchema(db, DataTypes);

// Relation between Models
User.hasMany(Timezone);
Timezone.belongsTo(User);

db.sync({ force: false })
  .then(() => {
    console.log("Tables Created");
  })
  .catch((err) => {
    console.log(err);
  });

export { User, Timezone };
