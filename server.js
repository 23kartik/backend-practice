const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const app = express();

connectDb();

app.use(express.json());
const port = process.env.PORT || 5000;

// Import Swagger configuration and Swagger UI
const swaggerUi = require("swagger-ui-express");
const specs = require("./swaggerConfig.js"); // You need to create this file

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Define your contacts API routes
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users",require("./routes/userRoutes"));


app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
