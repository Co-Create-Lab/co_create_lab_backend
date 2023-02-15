const Project = require("../models/projects");

const getAllProjects = async (req, res) => {
  try {
    const project = await Project.find();
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getOneProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);
    res.json(project);
  } catch (error) {
    res.status(500).send(error.messages);
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
    res.status(500).send(error.messages);
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
    res.status(500).send(error.messages);
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findByIdAndDelete(id);
    res.json(project);
  } catch (error) {
    res.status(500).send(error.messages);
  }
};

module.exports = {
  getAllProjects,
  getOneProject,
  createProject,
  deleteProject,
  updateProject,
};
