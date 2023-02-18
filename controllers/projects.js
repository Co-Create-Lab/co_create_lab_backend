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

const getOneProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);
    res.json(project);
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res) => {
  const {
    project_name,
    description,
    categories,
    location,
    start_date,
    tech_stack,
  } = req.body;
  try {
    const project = await Project.create({
      project_name,
      description,
      categories,
      location,
      start_date,
      tech_stack,
    });
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res) => {
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

const deleteProject = async (req, res) => {
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
  createProject,
  deleteProject,
  updateProject,
};
