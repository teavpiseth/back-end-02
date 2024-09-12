const db = require("../../database/db");

const productDataList = [];

const setProductData = (product, des, image) => {
  productDataList.push({ product, des, image });
};

const getProductData = () => {
  return productDataList;
};

const list = async () => {
  try {
    const [result] = await db.query("SELECT * FROM products");
    return result;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const add = async (product, des, image) => {
  try {
    const [result] = await db.query(
      "INSERT INTO products (Title, Description, Image) VALUES (?, ?, ?)",
      [product, des, image]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
  return null;
};

module.exports = { setProductData, getProductData, list, add };
