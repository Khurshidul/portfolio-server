const joi = require("joi");
const { model, Schema } = require("mongoose");

const blogSchema = new Schema({
  avatar: {
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
  authorName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 48,
  },
  cover: {
    type: String,
    required: true,
    minlength: 5,
  },
})

const Blog = model("blog", blogSchema);

const validateBlog = blog => {
  const schema = joi.object({
    avatar: joi.string().min(3).required(),
    title: joi.string().min(3).max(255).required(),
    description: joi.string().min(10).max(2048).required(),
    authorName: joi.string().min(3).max(48).required(),
    cover: joi.string().min(5).required(),
  });
  return schema.validate(blog);
};
exports.Blog = Blog;
exports.validateBlog = validateBlog;
