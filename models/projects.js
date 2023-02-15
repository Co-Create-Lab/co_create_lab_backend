const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    creator: { type: mongoose.ObjectId, ref: "User" },
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
