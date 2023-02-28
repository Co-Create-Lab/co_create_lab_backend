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

const getPaginateProjects = async (req, res, next) => {
  const {offset, limit} = req.query
  console.log(req.query)
  try {
    const project = await Project.find({})
    .sort({'createdAt': -1})
    .limit(limit)
    .skip(offset)
   
    const count = await Project.countDocuments()
    res.status(200).json({project, count});
  } catch (error) {
    next(error);
  }
};

const getSortedProjects = async (req, res, next) => {
  const { createdAt, start_date } = req.query;

  const sort = {};
  if (createdAt) sort.createdAt = createdAt;
  if (start_date) sort.start_date = start_date;

  try {
    const project = await Project.find({}).sort(sort);
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

const getFilteredProjects = async (req, res, next) => {
  const { keyword, categories, location, start_date, tech_stack } = req.query;

  const filter = {};
  if (keyword) filter.$text = { $search: keyword };
  if (location) filter.location = location;
  if (start_date) filter.start_date = start_date;
  if (categories) filter.categories = { $all: categories.split(",") };
  if (tech_stack) filter.tech_stack = { $all: tech_stack.split(",") };

  try {
    const project = await Project.find(filter);
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

const getFilteredSortedProjects = async (req, res, next) => {
  const {
    keyword,
    categories,
    location,
    start_dateF,
    tech_stack,
    start_date,
    createdAt,
  } = req.query;

  const filter = {};
  if (keyword) filter.$text = { $search: keyword };
  if (location) filter.location = location;
  if (start_dateF) filter.start_dateF = start_dateF;
  if (categories) filter.categories = { $all: categories.split(",") };
  if (tech_stack) filter.tech_stack = { $all: tech_stack.split(",") };

  const sort = {};
  if (createdAt) sort.createdAt = createdAt;
  if (start_date) sort.start_date = start_date;

  try {
    const project = await Project.find(filter).sort(sort);
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
    const { id } = req.user;
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
  const creator = req.user.id;
  try {
    const project = await Project.findByIdAndUpdate(
      id,
      {
        $set: {
          project_name,
          description,
          location,
          categories,
          tech_stack,
          creator,
        },
      },
      { new: true }
    );
    res.json(project);
  } catch (error) {
    next(error);
  }
};

const updateLikes = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json(project);
  } catch (error) {
    next(error);
  }
};

const updateViews = async (req, res, next) => {
  const { id } = req.body;
  try {
    const project = await Project.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );
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
  getFilteredProjects,
  getSortedProjects,
  getFilteredSortedProjects,
  updateLikes,
  updateViews,
  getPaginateProjects
};
