const express = require("express");
const projectRouter = express.Router();

const {
  getAllProjects,
  getOneProject,
  createProject,
  deleteProject,
  updateProject,
} = require("../controllers/projects");

projectRouter.get("/", getAllProjects);
projectRouter.get("/:id", getOneProject);
projectRouter.post("/", createProject);
projectRouter.put("/:id", updateProject);
projectRouter.delete("/:id", deleteProject);

module.exports = { projectRouter };
