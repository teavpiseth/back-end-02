const express = require("express");
const router = express.Router();
const employeeCtr = require("../controllers/employee/employeeCtr");
const { upload } = require("../helper/uploadFile");

router.get(
  "/api/employee/get-list",

  employeeCtr.getList
);
router.post("/api/employee/create", upload.single("image"), employeeCtr.create);
router.put("/api/employee/update", employeeCtr.update);
router.delete("/api/employee/delete", employeeCtr.remove);

module.exports = router;
