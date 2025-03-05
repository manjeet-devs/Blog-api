const express = require("express");
const Category = require("../models/Category");
const upload = require("../middleware/multer");
const { uploadImage } = require("../service/imageService/cloudnary")

const router = express.Router();

// ✅ Create Category
router.post("/",upload.single("featureImage") , async (req, res) => {
  try {

   const response = await uploadImage(req.file.path);
    req.body.featureImage = response.url;
    console.log(req.body);
    
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.log("reachedd", error);
    
    res.status(400).json({ error: "vgjheamgfiukgehjf" });
  }
});

// ✅ Get All Categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get Category by ID
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update Category
router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Delete Category
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
