const { Blog, validateBlog } = require("../models/blogs");
const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
router.get("/", async (req, res) => {
  const blog = await Blog.find().sort("title");
  res.send(blog);
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const blog = await Blog.findOne(query);
  res.send(blog);
});
router.post("/", async (req, res) => {
  const { error } = validateBlog(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let blog = await Blog.findOne({ title: req.body.title });
  if (blog) return res.status(400).send("user already registered.");
  blog = new Blog({
    avatar: req.body.avatar,
    title: req.body.title,
    description: req.body.description,
    authorName: req.body.authorName,
    cover: req.body.cover,
  });
  await blog.save();
  res.send(blog);
});
module.exports = router;