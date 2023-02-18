require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { authRouter } = require("./routes/auth.js");
const { userRouter } = require("./routes/users.js");
const { projectRouter } = require("./routes/projects.js");
const { errorHandler } = require("./middlewares/errorHandler");

require("./db");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/projects", projectRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
