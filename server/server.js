const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/blogs", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Blog Schema
const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
});
const Blog = mongoose.model("Blog", BlogSchema);

// Routes
app.get("/blogs", async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

app.post("/blogs", async (req, res) => {
  const { title, content } = req.body;
  const blog = new Blog({ title, content });
  await blog.save();
  res.json(blog);
});
// Delete a blog by ID
app.delete("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndDelete(id);
  res.json({ message: "Blog deleted successfully" });
});

// Update a blog by ID
app.put("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const updatedBlog = await Blog.findByIdAndUpdate(id, { title, content }, { new: true });
  res.json(updatedBlog);
});
// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
