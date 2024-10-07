const express = require("express");
const router = express.Router();
const {
  list,
  add,
  login,
  loginForm,
} = require("../controllers/admin/productCtr");

router.post("/product", list);

router.get("/add-product", add);
router.get("/login-form", loginForm);

router.get("/login", login);

module.exports = router;
