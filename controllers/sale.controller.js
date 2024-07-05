const Sale = require("../models/sale.model");
const validateSale = require("../validators/sale.validator");

exports.create = async (req, res) => {
  const { error } = validateSale(req.body);
  if (error) return res.status(400).send(error.details);

  const sale = new Sale(req.body);
  await sale.save();
  res.send({ message: "Sale created successfully" });
};

exports.getAll = async (req, res) => {
  const sales = await Sale.find().sort("date");
  res.send(sales);
};

exports.getById = async (req, res) => {
  const sale = await Sale.findById(req.params.id);
  if (!sale) return res.status(404).send({ message: "Sale not found" });
  res.send(sale);
};

exports.update = async (req, res) => {
  const { error } = validateSale(req.body);
  if (error) return res.status(400).send(error.details);

  const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!sale) return res.status(404).send({ message: "Sale not found" });
  res.send({ message: "Sale updated successfully" });
};

exports.delete = async (req, res) => {
  const sale = await Sale.findByIdAndRemove(req.params.id);
  if (!sale) return res.status(404).send({ message: "Sale not found" });
  res.send({ message: "Sale deleted successfully" });
};
