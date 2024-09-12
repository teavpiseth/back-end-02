const express = require("express");
const router = express.Router();
const {
  about,
  contact,
  page404,
  product,
} = require("../controllers/page/pageCtr");

router.get("/about", about);
router.get("/contact", contact);
router.get("/product", product);

router.get("/", page404);

module.exports = router;
