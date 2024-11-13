import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async actions
export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const response = await axios.get("http://localhost:5000/blogs");
  return response.data;
});

export const addBlog = createAsyncThunk("blogs/addBlog", async (newBlog) => {
  const response = await axios.post("http://localhost:5000/blogs", newBlog);
  return response.data;
});

export const deleteBlog = createAsyncThunk("blogs/deleteBlog", async (id) => {
  await axios.delete(`http://localhost:5000/blogs/${id}`);
  return id;
});

export const updateBlog = createAsyncThunk("blogs/updateBlog", async ({ id, updatedBlog }) => {
  const response = await axios.put(`http://localhost:5000/blogs/${id}`, updatedBlog);
  return response.data;
});

// Slice
const blogSlice = createSlice({
  name: "blogs",
  initialState: { blogs: [], status: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.blogs.findIndex((blog) => blog._id === action.payload._id);
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
      });
  },
});

export default blogSlice.reducer;
