// Import Modules
import express from "express";
import cors from "cors";

// App Settings
import configurations from "./config/config.js";

// Import Database Connection
import db from "./config/db.js";

// Middleware
import verifyToken from "./middleware/verifyToken.js";
import verifyRole from "./middleware/verifyRole.js";

// Create App Instance
const app = express();
const port = configurations.port || 5000;

// Configurations
app.use(cors());
app.use(express.json());

// Test DB Connection
db.authenticate()
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => console.log(err));

// Routes
import * as routes from "./routes/index.js";

app.use("/api/auth", routes.auth);
app.use(
  "/api/users",
  verifyToken,
  verifyRole([configurations.roles.ADMIN, configurations.roles.MANAGER]),
  routes.users
);
app.use(
  "/api/timezones",
  verifyToken,
  verifyRole([configurations.roles.ADMIN, configurations.roles.USER]),
  routes.timezones
);

// Handle 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Sorry can't find that!" });
});

// Start The Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
