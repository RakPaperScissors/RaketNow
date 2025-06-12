require("dotenv").config();
const db = require("./db");

const checkDatabaseConnection = async () => {
  console.log("Attempting to connect to the database...");

  try {
    const result = await db.query("SELECT NOW()");

    console.log("Database connection successful!");
    console.log("Current database time:", result.rows[0].now);
  } catch (error) {
    console.error("Failed to connect to the database.");
    console.error("Error details:", error.message);
  }
};
checkDatabaseConnection();
