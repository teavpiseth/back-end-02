const db = require("../../database/db");
const employeeModel = require("../../models/employee/employeeModel");
const employeeValidate = require("./employeeValidate");
const fs = require("fs").promises;

const create = async (req, res) => {
  try {
    const body = { ...req.body, image: req.file?.filename };
    const validate = employeeValidate.create(body);
    if (validate.result === false) {
      res.status(400).json({
        data: validate.errors,
        message: "fail",
      });
    }

    const result = await employeeModel.create(req, res);

    res.json({
      data: result,
      message: result?.affectedRows > 0 ? "success" : "fail",
    });
  } catch (error) {
    console.log(error);
  }
};

const update = async (req, res) => {
  try {
    const body = { ...req.body, image: req.file?.filename };
    const validate = employeeValidate.update(body);
    if (validate.result === false) {
      res.status(400).json({
        data: validate.errors,
        message: "fail",
      });
    }
    const filename = req?.file?.filename;
    if (filename && req.body?.imageOld) {
      await fs.unlink("uploads" + "/" + `${req.body.imageOld}`);
    }
    const result = await employeeModel.update(req, res);

    res.json({
      data: result,
      message: result?.affectedRows > 0 ? "success" : "fail",
    });
  } catch (error) {
    console.log(error);
  }
};
const getList = async (req, res) => {
  try {
    const result = await employeeModel.getList();
    res.json({
      data: result,
      message: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

const remove = async (req, res) => {
  try {
    const validate = employeeValidate.remove(req.body);
    if (validate.result === false) {
      res.status(400).json({
        data: validate.errors,
        message: "fail",
      });
    }
    const result = await employeeModel.remove(req, res);

    res.json({
      data: result,
      message: result?.affectedRows > 0 ? "success" : "fail",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getList, create, update, remove };
