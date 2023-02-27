const express = require("express");

const {
  getUsers,
  getProfile,
  updateUser,
  savedProject,
  removeProject,
} = require("../controllers/users");

const userRouter = express.Router();

const { verifyToken } = require("../middlewares/verifyToken");

userRouter.get("/", getUsers);
userRouter.get("/profile", verifyToken, getProfile);
userRouter.put("/:id", updateUser);
userRouter.post("/bookmarks", verifyToken, savedProject);
userRouter.delete("/remove", verifyToken, removeProject);
module.exports = { userRouter };
