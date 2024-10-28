const express = require("express");
const router = express.Router();
const employeeCtr = require("../controllers/employee/employeeCtr");
const { upload } = require("../helper/uploadFile");

const { verifyToken } = require("../helper/auth");
const { checkRole } = require("../helper/checkRole");

router.get(
  "/api/employee/get-list",
  async (req, res, next) => await checkRole("Employee", req, res, next),
  employeeCtr.getList
);
router.post(
  "/api/employee/create",
  async (req, res, next) => await checkRole("employee_add_new", req, res, next),
  upload.single("image"),
  employeeCtr.create
);
router.put("/api/employee/update", upload.single("image"), employeeCtr.update);
router.delete(
  "/api/employee/delete",
  async (req, res, next) => await checkRole("employee_update", req, res, next),
  employeeCtr.remove
);
router.post("/api/employee/login", employeeCtr.login);
router.post("/api/employee/refreshToken", employeeCtr.refreshToken);

module.exports = router;
