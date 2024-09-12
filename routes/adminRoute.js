const express = require("express");
const router = express.Router();
const { list, add } = require("../controllers/admin/productCtr");

router.post("/product", list);

router.get("/add-product", add);

module.exports = router;
