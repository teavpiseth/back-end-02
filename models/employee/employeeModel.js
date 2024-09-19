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
      image: req?.file?.filename || req.body?.imageOld,
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
const getList = async (req, res) => {
  try {
    const searchName = req.query?.search_name;
    const page = parseInt(req.query?.page) || 1;
    const limit = parseInt(req.query?.limit) || 10;

    const offset = (page - 1) * limit;

    let sql = "SELECT * FROM employee ";
    if (searchName) {
      sql += `where FirstName like '%${searchName}%' or LastName like '%${searchName}%'`;
    }
    sql += " order by id desc";

    sql += ` limit :limit offset :offset`;
    console.log(offset, limit);
    const [list] = await db.query(sql, { offset, limit });

    const [totalRecord] = await db.query(
      "select count(*) as totalRecord from employee"
    );

    return { list, totalRecord: totalRecord[0]?.totalRecord || 0 };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getList, create, update, remove };
