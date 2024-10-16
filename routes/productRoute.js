const express = require("express");
const router = express.Router();
const productCtr = require("../controllers/product/productCtr");
const { upload } = require("../helper/uploadFile");
// const { upload } = require("../helper/uploadFile");

router.get("/api/product/get-list", productCtr.getList);
router.get("/web/api/product/get-list", productCtr.getList);
router.post("/api/product/create", productCtr.create);
router.put("/api/product/update", productCtr.update);
router.delete("/api/product/delete", productCtr.remove);

router.post("/api/product/upload", upload.array("image"), productCtr.upload);

module.exports = router;
