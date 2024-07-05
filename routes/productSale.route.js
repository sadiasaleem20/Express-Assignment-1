const express = require("express");
const router = express.Router();
const ProductSaleController = require("../controllers/productSale.controller");

router.post("/", ProductSaleController.create);
router.get("/", ProductSaleController.getAll);
router.get("/:id", ProductSaleController.getById);
router.put("/:id", ProductSaleController.update);
router.delete("/:id", ProductSaleController.delete);

module.exports = router;
