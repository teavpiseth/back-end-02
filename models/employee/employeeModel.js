const Joi = require("joi");
const db = require("../../database/db");
const logs = require("../../helper/writeLog");
const create = async (req, res) => {
  try {
    const sql =
      "INSERT INTO employee (FirstName, LastName, Image, Gender, Dob, Tel, Address, Status) VALUES (:firstName, :lastName, :image, :gender, :dob, :tel, :address, :status)";

    const [result] = await db.query(sql, {
      ...req.body,
      image: req?.file?.filename,
    });

    return result;
  } catch (error) {
    logs.logError({ name: "employee.create", message: error, res });
  }
};

const update = async (req, res) => {
  try {
    const sql1 =
      "UPDATE employee SET FirstName = :firstName, LastName = :lastName, Image= :image, Gender = :gender, Dob = :dob, Tel = :tel, Address = :address, Status = :status WHERE id = :id";
    const [result] = await db.query(sql1, {
      ...req.body,
      image: req?.file?.filename || req.body?.image,
    });

    return result;
  } catch (error) {
    logs.logError({ name: "employee.update", message: error, res });
  }
};

const remove = async (req, res) => {
  try {
    const sql1 = "DELETE FROM employee WHERE id = :id";
    const [result] = await db.query(sql1, {
      ...req.body,
    });

    return result;
  } catch (error) {
    logs.logError({ name: "employee.remove", message: error, res });
  }
};
const getList = async () => {
  try {
    const [result] = await db.query("SELECT * FROM employee order by id desc");

    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getList, create, update, remove };
