const express = require("express");
const { createArticle, getAllArticles, getArticleById, updateArticle, deleteArticle } = require("../controllers/articleController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, createArticle);
router.get("/", getAllArticles);
router.get("/:id", getArticleById);
router.put("/:id", authMiddleware, updateArticle);
router.delete("/:id", authMiddleware, deleteArticle);

module.exports = router;
