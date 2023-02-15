const express = require("express");
const cors = require("cors");
const { projectRouter } = require("./routes/projects.js");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8080;

require("./db");

app.use(express.json());
app.use(cors());

app.use("/projects", projectRouter);
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
