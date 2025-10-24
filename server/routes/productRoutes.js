import express from "express";
import Product from "../models/Product.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ➕ Add product (Admin only)
router.post("/", protect, admin, async (req, res) => {
  try {
    const { name, description, price, category, image, inStock } = req.body;
    const product = await Product.create({ name, description, price, category, image, inStock });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 🧾 Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// 🔍 Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✏️ Update product (Admin only)
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ❌ Delete product (Admin only)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
