const path = require("path");
const {} = require("../../models/products/Products");
const { list: _list, add: _add } = require("../../models/products/Products");
const db = require("../../database/db");
const { IsLoggedIn, setLogin } = require("../../helper/writeLog");
const bcrypt = require("bcrypt");
const list = async (req, res) => {
  const { Title, Description, Image } = req.body;
  const addProduct = await _add(Title, Description, Image);

  const productDataList = await _list();
  res.render("product.ejs", { productDataList, isLoggedIn: req.isLoggedIn });
};

async function add(req, res) {
  res.render(path.join(__dirname, "../../", "views", "addProduct.ejs"), {
    isLoggedIn: req.session?.isLogin,
  });
}

async function loginForm(req, res) {
  res.sendFile(path.join(__dirname, "../../", "views", "login.html"));
}

async function login(req, res) {
  // res.cookie("isLogin", true);
  const { tel, password } = req.body;
  try {
    const [results] = await db.query("SELECT * FROM employee WHERE tel = ?", [
      tel,
    ]);
    if (results.length === 0) {
      return res.status(401).send("Invalid username.");
    }
    const employee = results[0];

    const match = await bcrypt.compare(password, employee.Password);
    if (!match) {
      return res.status(401).send("Invalid  password.");
    }
  } catch (error) {
    console.log(error);
  }
  req.session.isLogin = true;
  const productDataList = await _list();
  res.render(path.join(__dirname, "../../", "views", "product.ejs"), {
    productDataList,
    isLoggedIn: true,
  });
}
module.exports = { list, add, login, loginForm };
