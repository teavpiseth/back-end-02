const db = require("../../database/db");
const { deleteFile } = require("../../helper/uploadFile");
const employeeModel = require("../../models/employee/employeeModel");
const employeeValidate = require("./employeeValidate");
const fs = require("fs").promises;
const jwt = require("jsonwebtoken");

const create = async (req, res) => {
  try {
    const body = { ...req.body, image: req.file?.filename };
    const validate = employeeValidate.create(body);
    if (validate.result === false) {
      return res.status(401).json({
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
    const body = {
      ...req.body,
      image: req.file?.filename || req.body?.imageOld,
    };
    const validate = employeeValidate.update(body);
    if (validate.result === false) {
      return res.status(400).json({
        data: validate.errors,
        message: "fail",
      });
    }
    const filename = req?.file?.filename;
    if (filename && req.body?.imageOld) {
      await deleteFile(req.body?.imageOld);
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
    const result = await employeeModel.getList(req, res);
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
    const validate = employeeValidate.remove(req.body);
    if (validate.result === false) {
      return res.status(400).json({
        data: validate.errors,
        message: "fail",
      });
    }

    const [getEmployeeById] = await db.query(
      "SELECT * FROM employee WHERE id = :id",
      { id: req.body.id }
    );
    if (getEmployeeById?.[0]?.Image) {
      await deleteFile(getEmployeeById?.[0]?.Image);
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

const login = async (req, res) => {
  try {
    const result = await employeeModel.login(req, res);
    let _result = {};
    if (result) {
      _result = {
        ...result,
        Password: null,
      };
    }
    if (result?.error) {
      return res.status(401).send({
        data: null,
        message: result?.error,
      });
    }
    return res.json({
      data: _result,
      message: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

const refreshToken = async (req, res) => {
  try {
    const validate = employeeValidate.refreshToken(req.body);
    if (validate.result === false) {
      return res.status(400).json({
        data: validate.errors,
        message: "fail",
      });
    }

    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, "Sdafji@1213");

    if (decoded) {
      const sql = "SELECT * FROM employee WHERE Id = :id";
      const [result] = await db.query(sql, {
        id: decoded.id,
      });

      if (result?.[0]?.Status === 0 || result?.[0]?.Status === "0") {
        return res.status(401).send({
          data: null,
          message: "unauthorized",
        });
      }
      const accessToken = jwt.sign({ user: decoded.user }, "Sdafji@1213", {
        expiresIn: "1m",
      });
      const refreshToken = jwt.sign({ user: decoded.user }, "Sdafji@1213", {
        expiresIn: "1d",
      });
      return res.json({
        data: { accessToken, refreshToken },
        message: "success",
      });
    }

    return res.status(401).send({
      data: null,
      message: "unauthorized",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getList, create, update, remove, login, refreshToken };
