const path = require("path");
const { list } = require("../../models/products/Products");
const about = (req, res, next) => {
  res.render("about.ejs");
};

function contact(req, res, next) {
  res.sendFile(path.join(__dirname, "../../", "views", "contact.html"));
}

const page404 = (req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "../../", "views", "404.html"));
};

const product = async (req, res, next) => {
  const result = await list();
  console.log(result);
  res.render("product.ejs", { productDataList: result });
};

module.exports = { about, contact, page404, product };
