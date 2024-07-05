const ProductSale = require("../models/productSale.model");
const validateProductSale = require("../validators/productSale.validator");

exports.create = async (req, res) => {
  const { error } = validateProductSale(req.body);
  if (error) return res.status(400).send(error.details);

  const productSale = new ProductSale(req.body);
  await productSale.save();
  res.send({ message: "Product sale created successfully" });
};

exports.getAll = async (req, res) => {
  const productSales = await ProductSale.find().sort("date");
  res.send(productSales);
};

exports.getById = async (req, res) => {
  const productSale = await ProductSale.findById(req.params.id);
  if (!productSale)
    return res.status(404).send({ message: "Product sale not found" });
  res.send(productSale);
};

exports.update = async (req, res) => {
  const { error } = validateProductSale(req.body);
  if (error) return res.status(400).send(error.details);

  const productSale = await ProductSale.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!productSale)
    return res.status(404).send({ message: "Product sale not found" });
  res.send({ message: "Product sale updated successfully" });
};

exports.delete = async (req, res) => {
  const productSale = await ProductSale.findByIdAndRemove(req.params.id);
  if (!productSale)
    return res.status(404).send({ message: "Product sale not found" });
  res.send({ message: "Product sale deleted successfully" });
};
