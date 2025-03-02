let Blog;  

if (process.env.USE_DB_CONNECTION === 'true') {
  Blog = require('../models/Blog');  
} else {
  const blogsData = [
    { id: 1, title: 'Sample Blog 1', content: 'This is a sample blog content.' },
    { id: 2, title: 'Sample Blog 2', content: 'This is another blog content.' },
  ];

  Blog = {
    create: async (blogData) => {
      const newBlog = { id: blogsData.length + 1, ...blogData };
      blogsData.push(newBlog);
      return newBlog;
    },
    find: async () => {
      return blogsData;
    },
  };
}

// Create a new blog
const createBlog = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user ? req.user.id : 'demo-user'; // Use 'demo-user' for JSON-based blogs

  try {
    const newBlog = await Blog.create({
      title,
      content,
      user: userId,
    });
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createBlog, getBlogs };
