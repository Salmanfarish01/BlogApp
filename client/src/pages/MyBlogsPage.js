import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchBlogs } from "../redux/blogSlice";
import BlogList from "../components/BlogList";

const MyBlogsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <div>
      <h1>My Blogs</h1>
      <BlogList />
    </div>
  );
};

export default MyBlogsPage;
