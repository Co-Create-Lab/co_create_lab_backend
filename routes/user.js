const express = require("express");
const userRouter = express.Router();

const { getUsers, createUser } = require("../controllers/user");

userRouter.get("/", getUsers);
userRouter.post("/", createUser);

module.exports = { userRouter };
