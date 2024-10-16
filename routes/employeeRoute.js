const express = require("express");
const router = express.Router();
const employeeCtr = require("../controllers/employee/employeeCtr");
const { upload } = require("../helper/uploadFile");
const jwt = require("jsonwebtoken");

router.get(
  "/api/employee/get-list",
  (req, res, next) => {
    const authorization = req.headers.authorization;
    const token = authorization?.split(" ")[1];
    // console.log(token);
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    try {
      const decoded = jwt.verify(token, "Sdafji@1213");
      if (decoded) {
        req.user = decoded.user;
      }
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    next();
  },
  employeeCtr.getList
);
router.post("/api/employee/create", upload.single("image"), employeeCtr.create);
router.put("/api/employee/update", upload.single("image"), employeeCtr.update);
router.delete("/api/employee/delete", employeeCtr.remove);
router.post("/api/employee/login", employeeCtr.login);
router.post("/api/employee/refreshToken", employeeCtr.refreshToken);

module.exports = router;
