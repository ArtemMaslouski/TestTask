const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRotes");
const runRotes = require("./routes/runRoutes");
const imageRoutes = require("./routes/imageRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/runs", runRotes);
app.use("/api/auth", authRoutes);
app.use("/api/image", imageRoutes);

app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
