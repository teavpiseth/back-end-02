const path = require("path");
const {} = require("../../models/products/Products");
const { list: _list, add: _add } = require("../../models/products/Products");
const db = require("../../database/db");
const list = async (req, res) => {
  const { Title, Description, Image } = req.body;
  const addProduct = await _add(Title, Description, Image);

  const productDataList = await _list();
  res.render("product.ejs", { productDataList, isLoggedIn: false });
};

async function add(req, res) {
  res.render(path.join(__dirname, "../../", "views", "addProduct.ejs"), {
    isLoggedIn: false,
  });
}

async function loginForm(req, res) {
  res.sendFile(path.join(__dirname, "../../", "views", "login.html"));
}

async function login(req, res) {
  const productDataList = await _list();
  res.render(path.join(__dirname, "../../", "views", "product.ejs"), {
    productDataList,
    isLoggedIn: true,
  });
}
module.exports = { list, add, login, loginForm };
