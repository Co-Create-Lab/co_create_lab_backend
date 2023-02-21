const Project = require("../models/projects");
const { exists } = require("../models/user");
const { ErrorResponse } = require("../utils/ErrorResponse");


const getAllProjects = async (req, res, next) => {

  try {
    const project = await Project.find();
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

const getSortedProjects = async (req, res, next) => {
  const {
    createdAt,
    start_date} = req.query

    const sort = {}
    if (createdAt) sort.createdAt = createdAt
    if (start_date) sort.start_date = start_date
  try {
    const project = await Project.find({}).sort(sort);
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

const getFilteredProjects = async (req, res, next) => {
   const {
     keyword,
     categories,
     location,
     start_date,
     tech_stack,
   } = req.query

   const filter = {}
   if (keyword) filter.$text = { $search: keyword }
   if(location) filter.location = location
   if(start_date) filter.start_date = start_date
   if(categories) filter.categories = {$all: categories.split(',')}

   console.log(filter)

  try {
    const project = await Project.find(filter);
    res.status(200).json(project);
    
  } catch (error) {
    next(error);
  }
};

const getOneProject = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
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
  createProject,
  deleteProject,
  updateProject,
  getFilteredProjects,
  getSortedProjects
};
