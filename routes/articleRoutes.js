const express = require("express");
const { createArticle, getAllArticles, getArticleById, updateArticle, deleteArticle } = require("../controllers/article");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/add", authMiddleware, createArticle);
router.get("/", getAllArticles);
router.get("/:id", authMiddleware, getArticleById);
router.put("/:id", authMiddleware, updateArticle);
router.delete("/:id", authMiddleware, deleteArticle);

module.exports = router;
