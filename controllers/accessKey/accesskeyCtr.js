const db = require("../../database/db");
const { deleteFile } = require("../../helper/uploadFile");
const accessKeyModel = require("../../models/accessKey/accessKeyModel");
const accessKeyValidate = require("./accessKeyValidate");

const create = async (req, res) => {
  try {
    const body = { ...req.body };
    const validate = accessKeyValidate.create(body);
    if (validate.result === false) {
      return res.status(400).json({
        data: validate.errors,
        message: "fail",
      });
    }

    const result = await accessKeyModel.create(req, res);
    // res.json({ data: "hello" });
    if (result) {
      res.status(result?.error ? 400 : 200).json({
        data: result,
        message: result?.affectedRows > 0 ? "success" : "fail",
        ...result?.error && { errors: {msg: result?.error}},
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
    const validate = accessKeyValidate.update(body);
    if (validate.result === false) {
      return res.status(400).json({
        data: validate.errors,
        message: "fail",
      });
    }

    const result = await accessKeyModel.update(req, res);

    if (result) {
      res.status(result?.error ? 400 : 200).json({
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
    const result = await accessKeyModel.getList(req, res);
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
    const validate = accessKeyValidate.remove(req.body);
    if (validate.result === false) {
      return res.status(400).json({
        data: validate.errors,
        message: "fail",
      });
    }

    const result = await accessKeyModel.remove(req, res);
    if (result) {
      res.status(result?.error ? 400 : 200).json({
        data: result,
        message: result?.affectedRows > 0 ? "success" : "fail",
        ...result?.error && { errors: {msg: result?.error}},
      });
    }

  } catch (error) {
    console.log(error);
  }
};

module.exports = { getList, create, update, remove };
