const Category = require("../models/category.model");
const validateCategory = require("../validators/category.validator");

exports.create = async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details);

  const category = new Category(req.body);
  await category.save();
  res.send({ message: "Category created successfully" });
};

exports.getAll = async (req, res) => {
  const categories = await Category.find().sort("name");
  res.send(categories);
};

exports.getById = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).send({ message: "Category not found" });
  res.send(category);
};

exports.update = async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details);

  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!category) return res.status(404).send({ message: "Category not found" });
  res.send({ message: "Category updated successfully" });
};

exports.delete = async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);
  if (!category) return res.status(404).send({ message: "Category not found" });
  res.send({ message: "Category deleted successfully" });
};
