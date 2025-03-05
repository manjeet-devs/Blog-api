const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    parentName: { type: String, trim: true }, 
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    featureImage: { type: Object, default: {} },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("mk_category", categorySchema);
