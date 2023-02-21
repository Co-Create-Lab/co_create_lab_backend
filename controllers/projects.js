const Project = require("../models/projects");
const { ErrorResponse } = require("../utils/ErrorResponse");

const getAllProjects = async (req, res, next) => {
  try {
    const project = await Project.find();
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

const getOneProject = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id).populate("creator");
    res.json(project);
  } catch (error) {
    next(error);
  }
};

const getUserProjects = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.find({ creator: id });
    res.json(project);
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  const {
    project_name,
    description,
    categories,
    location,
    start_date,
    tech_stack,
  } = req.body;
  const creator = req.user.id;
  try {
    const project = await Project.create({
      project_name,
      description,
      categories,
      location,
      start_date,
      tech_stack,
      creator,
    });
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  const { id } = req.params;
  const { project_name, description, location, categories, tech_stack } =
    req.body;
  try {
    const project = await Project.findByIdAndUpdate(id, {
      $set: { project_name, description, location, categories, tech_stack },
    });
    res.json(project);
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findByIdAndDelete(id);
    res.json(project);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProjects,
  getOneProject,
  getUserProjects,
  createProject,
  deleteProject,
  updateProject,
};
