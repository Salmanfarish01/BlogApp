import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, updateBlog } from "../redux/blogSlice";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs.blogs);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteBlog(id));
  };

  const handleUpdate = (id) => {
    const newTitle = prompt("Enter the new title:");
    const newContent = prompt("Enter the new content:");
    if (newTitle && newContent) {
      dispatch(updateBlog({ id, updatedBlog: { title: newTitle, content: newContent } }));
    } else {
      alert("Both title and content are required for updating.");
    }
  };

  return (
    <div style={styles.container}>
      {blogs.map((blog) => (
        <div key={blog._id} style={styles.blogCard}>
          <h3 style={styles.title}>{blog.title}</h3>
          <p style={styles.content}>{blog.content}</p>
          <div style={styles.buttonGroup}>
            <button onClick={() => handleUpdate(blog._id)} style={styles.editButton}>
              Edit
            </button>
            <button onClick={() => handleDelete(blog._id)} style={styles.deleteButton}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    margin: "20px auto",
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  blogCard: {
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
  },
  content: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "15px",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
  },
  editButton: {
    padding: "8px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s",
  },
  deleteButton: {
    padding: "8px 15px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s",
  },
};

export default BlogList;
