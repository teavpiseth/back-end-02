const Joi = require("joi");
const db = require("../../database/db");
const logs = require("../../helper/writeLog");

const table = "category";

const create = async (req, res) => {
  try {
    const sql = `INSERT INTO ${table} (Name, Description, Image, Status, ParentsId) VALUES (:name, :description, :image, :status, :parentsId)`;

    const [result] = await db.query(sql, {
      ...req.body,
      image: req?.file?.filename,
    });

    return result;
  } catch (error) {
    logs.logError({ name: `${table}.create`, message: error, res });
  }
};

const update = async (req, res) => {
  try {
    const sql = `UPDATE ${table} SET Name = :name, Description = :description, Image= :image, status = :status, ParentsId = :parentsId WHERE id = :id`;
    const [result] = await db.query(sql, {
      ...req.body,
      image: req?.file?.filename || req.body?.imageOld,
    });

    return result;
  } catch (error) {
    logs.logError({ name: `${table}.update`, message: error, res });
  }
};

const remove = async (req, res) => {
  try {
    const sql1 = `DELETE FROM ${table} WHERE id = :id`;
    const [result] = await db.query(sql1, {
      ...req.body,
    });

    return result;
  } catch (error) {
    logs.logError({ name: `${table}.remove`, message: error, res });
  }
};
const getList = async (req, res) => {
  try {
    const searchName = req.query?.search_name;
    const page = parseInt(req.query?.page) || 1;
    const limit = parseInt(req.query?.limit) || 10;

    const offset = (page - 1) * limit;

    let sql = `SELECT * FROM ${table} `;
    if (searchName) {
      sql += `where concat(FirstName,LastName) like '%${searchName.replaceAll(
        " ",
        ""
      )}%'`;
    }
    sql += " order by id desc";

    sql += ` limit :limit offset :offset`;
    const [list] = await db.query(sql, { offset, limit });

    const [totalRecord] = await db.query(
      `select count(*) as totalRecord from ${table}`
    );

    return { list, totalRecord: totalRecord[0]?.totalRecord || 0 };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getList, create, update, remove };
