const express = require("express");
const router = express.Router();
const employeeCtr = require("../controllers/employee/employeeCtr");
const { upload } = require("../helper/uploadFile");

const { verifyToken } = require("../helper/auth");

router.get("/api/employee/get-list", employeeCtr.getList);
router.post("/api/employee/create", upload.single("image"), employeeCtr.create);
router.put("/api/employee/update", upload.single("image"), employeeCtr.update);
router.delete("/api/employee/delete", employeeCtr.remove);
router.post("/api/employee/login", employeeCtr.login);
router.post("/api/employee/refreshToken", employeeCtr.refreshToken);

module.exports = router;
