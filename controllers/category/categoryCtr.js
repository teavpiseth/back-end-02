const db = require("../../database/db");
const { deleteFile } = require("../../helper/uploadFile");
const categoryModel = require("../../models/category/categoryModel");
const categoryValidate = require("./categoryValidate");

const create = async (req, res) => {
  try {
    const body = { ...req.body, image: req.file?.filename };
    const validate = categoryValidate.create(body);
    if (validate.result === false) {
      res.status(400).json({
        data: validate.errors,
        message: "fail",
      });
    }

    const result = await categoryModel.create(req, res);
    // res.json({ data: "hello" });

    console.log(result);
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
    const validate = categoryValidate.update(body);
    if (validate.result === false) {
      res.status(400).json({
        data: validate.errors,
        message: "fail",
      });
    }
    const filename = req?.file?.filename;
    if (filename && req.body?.imageOld) {
      await deleteFile(req.body?.imageOld);
    }
    const result = await categoryModel.update(req, res);

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
    const result = await categoryModel.getList(req, res);
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
    const validate = categoryValidate.remove(req.body);
    if (validate.result === false) {
      res.status(400).json({
        data: validate.errors,
        message: "fail",
      });
    }

    const [getCategoryById] = await db.query(
      `SELECT * FROM category WHERE id = :id`,
      { id: req.body.id }
    );
    if (getCategoryById?.[0]?.Image) {
      await deleteFile(getCategoryById?.[0]?.Image);
    }

    const result = await categoryModel.remove(req, res);

    res.json({
      data: result,
      message: result?.affectedRows > 0 ? "success" : "fail",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getList, create, update, remove };
