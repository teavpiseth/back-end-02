const express = require("express");
const router = express.Router();
const accessRole = require("../controllers/accessRole/accessRoleCtrl");

router.get("/api/access-role/get-list", accessRole.getList);
router.post("/api/access-role/create", accessRole.create);
router.put("/api/access-role/update", accessRole.update);
router.delete("/api/access-role/delete", accessRole.remove);

module.exports = router;
