const express = require("express");
const router = express.Router();
const role = require("../controllers/role/roleCtr");

router.get("/api/role/get-list", role.getList);
router.post("/api/role/create", role.create);
router.put("/api/role/update", role.update);
router.delete("/api/role/delete", role.remove);

module.exports = router;
