const express = require("express");
const router = express.Router();
const categoryCtr = require("../controllers/category/categoryCtr");
const { upload } = require("../helper/uploadFile");
const { checkRole } = require("../helper/checkRole");

router.get(
  "/api/category/get-list",
  async (req, res, next) => await checkRole("Category", req, res, next),
  categoryCtr.getList
);
router.get("/web/api/category/get-list", categoryCtr.getList);
router.post("/api/category/create", upload.single("image"), categoryCtr.create);
router.put("/api/category/update", upload.single("image"), categoryCtr.update);
router.delete("/api/category/delete", categoryCtr.remove);

module.exports = router;
