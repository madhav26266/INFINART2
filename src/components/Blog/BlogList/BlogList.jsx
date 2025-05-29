import React, { useState } from "react";
import "./BlogList.css";

const BlogList = ({ blogs = [], onDelete = () => {}, onEdit = () => {} }) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleReadMore = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="blog-list">
    <div className="blog-list-container">
      <h2>Show All Your Blogs</h2>
      {Array.isArray(blogs) && blogs.length === 0 ? (
        <p>No blogs yet.</p>
      ) : (
        <div className="blog-grid">
          {blogs.map((blog) => {
            const isExpanded = expandedId === blog?.id;
            const content = blog?.content || "";
            const shouldTruncate = content.length > 100;

            return (
              <div key={blog?.id} className={`blog-card ${isExpanded ? "expanded" : ""}`}>
                <img src={blog?.image} alt="Blog" className="blog-image" />
                <p><strong>{blog?.name}</strong></p>
                <h3>{blog?.title}</h3>

                <p className="blog-content">
                  {isExpanded || !shouldTruncate
                    ? content
                    : content.slice(0, 100) + "..."}
                </p>

                {shouldTruncate && (
                  <button
                    onClick={() => toggleReadMore(blog?.id)}
                    className="read-more-btn"
                  >
                    {isExpanded ? "Show Less" : "Read More"}
                  </button>
                )}

                <div className="blog-buttons">
                  <button
                    onClick={() => onEdit(blog)}
                    className="submit-btn edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(blog?.id)}
                    className="submit-btn delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
    </div>
  );
};

export default BlogList;

