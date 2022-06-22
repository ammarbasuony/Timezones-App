import Sequelize from "sequelize";
import configurations from "./config";

const connection = new Sequelize({
  dialect: configurations.db.dialect,
  storage: configurations.db.storage,
  logging: configurations.db.logging,
  define: {
    charset: configurations.db.define.charset,
    collate: configurations.db.define.collate,
  },
});

export default connection;
