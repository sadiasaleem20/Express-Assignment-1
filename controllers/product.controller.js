const Product = require("../models/product.model");
const validateProduct = require("../validators/product.validator");

exports.create = async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details);

  const product = new Product(req.body);
  await product.save();
  res.send({ message: "Product created successfully" });
};

exports.getAll = async (req, res) => {
  const products = await Product.find().sort("name");
  res.send(products);
};

exports.getById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send({ message: "Product not found" });
  res.send(product);
};

exports.update = async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details);

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product) return res.status(404).send({ message: "Product not found" });
  res.send({ message: "Product updated successfully" });
};

exports.delete = async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);
  if (!product) return res.status(404).send({ message: "Product not found" });
  res.send({ message: "Product deleted successfully" });
};
