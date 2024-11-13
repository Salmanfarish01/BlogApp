const express = require("express");
const Blog = require("../models/Blog");
const router = express.Router();

// Get all blogs
router.get("/myblogs", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

// Create a blog
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  const newBlog = new Blog({ title, content });
  await newBlog.save();
  res.json(newBlog);
});

// Update a blog
router.put("/:id", async (req, res) => {
  const { title, content } = req.body;
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
  res.json(updatedBlog);
});

// Delete a blog
router.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted" });
});

module.exports = router;
