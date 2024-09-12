const path = require("path");
const {} = require("../../models/products/Products");
const { list: _list, add: _add } = require("../../models/products/Products");
const db = require("../../database/db");
const list = async (req, res) => {
  const { Title, Description, Image } = req.body;
  const addProduct = await _add(Title, Description, Image);
  console.log(addProduct);
  const productDataList = await _list();
  res.render("product.ejs", { productDataList });
};

async function add(req, res) {
  res.render(path.join(__dirname, "../../", "views", "addProduct.ejs"));
}

module.exports = { list, add };
