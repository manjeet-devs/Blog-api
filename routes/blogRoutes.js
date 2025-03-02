const express = require('express');
const { createBlog, getBlogs } = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/blog', protect, createBlog);
router.get('/blogs', protect, getBlogs);

module.exports = router;
