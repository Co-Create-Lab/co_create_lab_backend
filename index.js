const express = require("express");
const cors = require("cors");
const { projectRouter } = require("./routes/projects.js");
const { userRouter } = require("./routes/user.js");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8080;

require("./db");

app.use(express.json());
app.use(cors());

app.use("/projects", projectRouter);
app.use("/user", userRouter);
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
