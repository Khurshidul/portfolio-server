const joi = require("joi");
const { model, Schema } = require("mongoose");

const projectSchema = new Schema({
  poster: {
    type: String,
    required: true,
    minlength: 5,
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 2048,
  },
  url: {
    type: String,
    required: true,
  },
  githubUrl: {
    type: String,
    required: true,
  },
})

const Project = model("project", projectSchema);

const validateProject = project => {
  const schema = joi.object({
    poster: joi.string().min(3).required(),
    title: joi.string().min(3).max(255).required(),
    description: joi.string().min(10).max(2048).required(),
    url: joi.string().required(),
    githubUrl: joi.string().required(),
  });
  return schema.validate(project);
};
exports.Project = Project;
exports.validateProject = validateProject;
