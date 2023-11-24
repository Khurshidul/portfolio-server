const { Project, validateProject } = require("../models/project");
const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
router.get("/", async (req, res) => {
  try {
    const project = await Project.find().sort("title");
    res.send(project);
  } catch (error) {
    console.error(error);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const project = await Project.findOne(query);
    res.send(project);
  } catch (error) {
    console.error(error);
  }
});
router.post("/", async (req, res) => {
  try {
    const { error } = validateProject(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let project = await Project.findOne({ title: req.body.title });
    if (project) return res.status(400).send("user already registered.");
    blog = new Project({
      poster: req.body.poster,
      title: req.body.title,
      description: req.body.description,
      url: req.body.url,
      githubUrl: req.body.githubUrl,
    });
    await project.save();
    res.send(project);
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
