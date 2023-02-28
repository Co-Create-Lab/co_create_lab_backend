const express = require("express");


const {
  getAllProjects,
  getOneProject,
  createProject,
  deleteProject,
  updateProject,
  getFilteredProjects,
  getSortedProjects,
  getUserProjects,
  getFilteredSortedProjects,
  updateLikes,
  updateViews,
  getPaginateProjects
} = require("../controllers/projects");

const { verifyToken } = require("../middlewares/verifyToken");

const projectRouter = express.Router();

projectRouter.get("/", getAllProjects);
projectRouter.get("/sort", getSortedProjects);
projectRouter.get("/paginate", getPaginateProjects);



projectRouter.get("/search", getFilteredProjects);
projectRouter.get("/search/sort", getFilteredSortedProjects);

projectRouter.get("/:id", getOneProject);
projectRouter.get("/myprojects/:id", verifyToken, getUserProjects);
projectRouter.post("/", verifyToken, createProject);
projectRouter.put("/:id", verifyToken, updateProject);
projectRouter.put("/like/:id", updateLikes);
projectRouter.post("/view", updateViews);
projectRouter.delete("/:id", verifyToken, deleteProject);

module.exports = { projectRouter };
