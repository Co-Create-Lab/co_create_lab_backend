const express = require("express");

const {
  getAllProjects,
  getOneProject,
  createProject,
  deleteProject,
  updateProject,
} = require("../controllers/projects");

const projectRouter = express.Router();

projectRouter.get("/", getAllProjects);
projectRouter.get("/:id", getOneProject);
projectRouter.post("/", createProject);
projectRouter.put("/:id", updateProject);
projectRouter.delete("/:id", deleteProject);

module.exports = { projectRouter };
