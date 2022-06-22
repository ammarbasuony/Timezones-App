// Import Modules
import express from "express";
import cors from "cors";

// App Settings
import configurations from "./config/config";

// Import Database Connection
import db from "./config/db";

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

// Handle 404
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Sorry can't find that!" });
});

// Start The Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
