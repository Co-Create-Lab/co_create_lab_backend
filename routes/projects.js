const express = require("express");

const {
  getAllProjects,
  getOneProject,
  createProject,
  deleteProject,
  updateProject,
  getUserProjects,
} = require("../controllers/projects");

const { verifyToken } = require("../middlewares/verifyToken");

const projectRouter = express.Router();

projectRouter.get("/", getAllProjects);
projectRouter.get("/:id", getOneProject);
projectRouter.get("/myprojects/:id", verifyToken, getUserProjects);
projectRouter.post("/", verifyToken, createProject);
projectRouter.put("/:id", updateProject);
projectRouter.delete("/:id", deleteProject);

module.exports = { projectRouter };
