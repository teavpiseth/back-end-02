const express = require("express");
const router = express.Router();
const accessKey = require("../controllers/accessKey/accesskeyCtr");

router.get("/api/access-key/get-list", accessKey.getList);
router.get("/web/api/product/get-list", accessKey.getList);
router.post("/api/access-key/create", accessKey.create);
router.put("/api/access-key/update", accessKey.update);
router.delete("/api/access-key/delete", accessKey.remove);


module.exports = router;
