const db = require("../../database/db");
const { deleteFile } = require("../../helper/uploadFile");
const productModel = require("../../models/product/productModel");
const productValidate = require("./productValidate");

const create = async (req, res) => {
  try {
    const body = { ...req.body };
    const validate = productValidate.create(body);
    if (validate.result === false) {
      return res.status(400).json({
        data: validate.errors,
        message: "fail",
      });
    }

    const result = await productModel.create(req, res);

    if (result) {
      res.json({
        data: result,
        message: result?.affectedRows > 0 ? "success" : "fail",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const update = async (req, res) => {
  try {
    const body = {
      ...req.body,
    };
    const validate = productValidate.update(body);
    if (validate.result === false) {
      return res.status(400).json({
        data: validate.errors,
        message: "fail",
      });
    }

    const result = await productModel.update(req, res);

    if (result) {
      res.json({
        data: result,
        message: result?.affectedRows > 0 ? "success" : "fail",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const getList = async (req, res) => {
  try {
    const result = await productModel.getList(req, res);
    res.json({
      data: result.list,
      message: "success",
      totalRecord: result.totalRecord,
    });
  } catch (error) {
    console.log(error);
  }
};

const remove = async (req, res) => {
  try {
    const validate = productValidate.remove(req.body);
    if (validate.result === false) {
      return res.status(400).json({
        data: validate.errors,
        message: "fail",
      });
    }

    const result = await productModel.remove(req, res);

    res.json({
      data: result,
      message: result?.affectedRows > 0 ? "success" : "fail",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getList, create, update, remove };
