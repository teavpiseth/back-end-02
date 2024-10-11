const path = require("path");
const { list } = require("../../models/products/Products");
const { IsLoggedIn } = require("../../helper/writeLog");
const about = (req, res, next) => {
  res.render("about.ejs", { isLoggedIn: req.session?.isLogin });
};

function contact(req, res, next) {
  res.sendFile(path.join(__dirname, "../../", "views", "contact.html"));
}

const page404 = (req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "../../", "views", "404.html"));
};

const product = async (req, res, next) => {
  const result = await list();

  res.render("product.ejs", {
    productDataList: result,
    isLoggedIn: req.session?.isLogin,
  });
};

module.exports = { about, contact, page404, product };
