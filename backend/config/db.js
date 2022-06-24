import Sequelize from "sequelize";
import configurations from "./config.js";

const connection = new Sequelize({
  dialect: configurations.db.dialect,
  storage: configurations.db.storage,
  logging: configurations.db.logging,
  define: {
    charset: configurations.db.define.charset,
    collate: configurations.db.define.collate,
  },
});

// const connection = new Sequelize("test", "root", "", {
//   define: {
//     charset: "utf8",
//     collate: "utf8_general_ci",
//   },
//   host: "localhost",
//   dialect: "mysql",
// });

export default connection;