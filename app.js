const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRotes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger");

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
