const { Blog, validateBlog } = require("../models/blogs");
const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
router.get("/", async (req, res) => {
  try {
    const blog = await Blog.find().sort("title");
    res.send(blog);
  } catch (error) {
    console.error(error);
  }
});
router.get("/:id", async (req, res) => {
  try{
    const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const blog = await Blog.findOne(query);
  res.send(blog);
  }catch (error) {
    console.error(error);
  }
});
router.post("/", async (req, res) => {
 try{
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
 }catch (error) {
  console.error(error);
}
});
module.exports = router;
