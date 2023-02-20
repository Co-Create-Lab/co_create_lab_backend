const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const { Schema, Types, model } = require("mongoose");

const projectSchema = new Schema(
  {
    creator: { type: mongoose.ObjectId, ref: "User", required: true },
    project_name: { type: String, required: true },
    description: [{ type: String, required: true }],
    location: { type: String, required: true },
    start_date: { type: String, default: "Open" },
    categories: [{ type: String, required: true }],
    tech_stack: [{ type: String }],
    clicked: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
// const Project = model("Project", projectSchema);
// module.exports = { Project };
