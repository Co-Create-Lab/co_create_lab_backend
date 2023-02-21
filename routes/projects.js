const express = require("express");

const {
  getAllProjects,
  getOneProject,
  createProject,
  deleteProject,
  updateProject,
  getFilteredProjects,
  getSortedProjects
} = require("../controllers/projects");

const { verifyToken } = require("../middlewares/verifyToken");

const projectRouter = express.Router();

projectRouter.get("/", getAllProjects);
projectRouter.get("/sort", getSortedProjects);


projectRouter.get("/search", getFilteredProjects);

projectRouter.get("/:id", getOneProject);
// projectRouter.get("/myprojects/:id", getUserProjects);
projectRouter.post("/", createProject);
projectRouter.put("/:id", updateProject);
projectRouter.delete("/:id", deleteProject);

module.exports = { projectRouter };
