require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { authRouter } = require("./routes/auth.js");
const { userRouter } = require("./routes/users.js");
const { projectRouter } = require("./routes/projects.js");
const { errorHandler } = require("./middlewares/errorHandler");
const { verifyToken } = require("./middlewares/verifyToken.js");


require("./db");

const app = express();
const PORT = process.env.PORT || 8080;

// app.use(
//   cors({
//     origin: ["https://tranquil-peony-73eb04.netlify.app", "http://localhost:3000"],
//     credentials: true,
//   })
// );

// const allowedDomains = ['https://tranquil-peony-73eb04.netlify.app', 'http://localhost:3000'];
// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);
 
//     if (allowedDomains.indexOf(origin) === -1) {
//       var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }
// }));

app.use(function (req, res, next) {

  const allowedDomains = ['http://localhost:3000','https://tranquil-peony-73eb04.netlify.app' ];
  const origin = req.headers.origin;
  if(allowedDomains.indexOf(origin) > -1){
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
})


app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/projects", projectRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
