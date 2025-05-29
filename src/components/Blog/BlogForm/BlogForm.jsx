import React, { useState, useRef, useEffect } from "react";
import "./BlogForm.css"; // External CSS

const BlogForm = ({ onSubmit, selectedBlog, clearEdit }) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (selectedBlog) {
      setName(selectedBlog.name);
      setTitle(selectedBlog.title);
      setContent(selectedBlog.content);
      setImage(selectedBlog.image);
    }
  }, [selectedBlog]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !title || !content || !image) {
      alert("All fields are required!");
      return;
    }

    onSubmit({
      id: selectedBlog?.id || Date.now(),
      name,
      title,
      content,
      image,
    });

    setName("");
    setTitle("");
    setContent("");
    setImage("");
    clearEdit();
  };

  return (
    <div className="blog-form-container">
      <div className="blog-form-card">
        <div className="blog-form-content">
          <h1 className="blog-form-title">
            {selectedBlog ? "Edit Blog" : "Write a Blog"}
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="blog-form-grid">
              <div className="blog-form-fields">
                <div className="blog-form-row">
                  <div className="blog-form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="blog-form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="blog-form-group">
                  <label>Content</label>
                  <textarea
                    rows="8"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="blog-form-image-upload">
                <label>Image</label>
                <div className="image-upload-box">
                  <div className="image-preview">
                    {image ? (
                      <img src={image} alt="Preview" />
                    ) : (
                      <div className="image-placeholder">
                        <div className="circle" />
                        <div className="line" />
                      </div>
                    )}
                  </div>

                  <div className="upload-controls">
                    <p>Drag & Drop or Browse</p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                    >
                      Browse
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="submit-button-wrapper">
              <button type="submit">
                {selectedBlog ? "Update Blog" : "Submit Blog"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default BlogForm;

