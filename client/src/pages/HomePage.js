import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchBlogs } from "../redux/blogSlice";
import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <div>
      <BlogForm />
      <BlogList />
    </div>
  );
};

export default HomePage;
