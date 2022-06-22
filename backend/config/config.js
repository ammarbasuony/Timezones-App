const configurations = {
  port: 8000,
  db: {
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false,
    define: {
      charset: "utf8",
      collate: "utf8_general_ci",
    },
  },
};

export default configurations;