const express = require("express");
const router = express.Router();
const productCtr = require("../controllers/product/productCtr");
// const { upload } = require("../helper/uploadFile");

router.get(
  "/api/product/get-list",

  productCtr.getList
);
router.post("/api/product/create", productCtr.create);
router.put("/api/product/update", productCtr.update);
router.delete("/api/product/delete", productCtr.remove);

module.exports = router;
