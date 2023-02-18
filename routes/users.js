const express = require("express");

const { getUsers, getProfile, updateUser } = require("../controllers/users");

const userRouter = express.Router();

const { verifyToken } = require("../middlewares/verifyToken");

userRouter.get("/", getUsers);
userRouter.get("/profile", getProfile);
userRouter.put("/:id", updateUser);

module.exports = { userRouter };
