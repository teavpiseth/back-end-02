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

router.post("/login", login);

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/product");
});

module.exports = router;
