const configurations = {
  port: 8000,
  jwt_token_key: "toptal-task-token",
  roles: {
    ADMIN: 2,
    MANAGER: 1,
    USER: 0,
  },
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
