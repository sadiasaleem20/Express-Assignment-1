const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controller");

router.post("/", ProductController.create);
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.delete);

module.exports = router;
