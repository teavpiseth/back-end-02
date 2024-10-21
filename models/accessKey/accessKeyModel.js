const Joi = require("joi");
const db = require("../../database/db");
const logs = require("../../helper/writeLog");

const table = "access_key";

const create = async (req, res) => {
  try {
    const sqlDuplicate = `SELECT * FROM ${table} WHERE Code = :code`;
    const [resultDuplicate] = await db.query(sqlDuplicate, {
      ...req.body, //code
    });
    if (resultDuplicate.length > 0) {
      return { error: "Code already exists" };
    }
    const sql = `INSERT INTO ${table} (Name, Code, ParentId, Status) VALUES (:name, :code, :parentId, :status)`;

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
    const sql = `UPDATE ${table} SET Name = :name, status = :status , code = :code, ParentId = :parentId WHERE id = :id`;
    const [result] = await db.query(sql, {
      ...req.body,
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
    let filter = "";
    let sql = `SELECT * FROM ${table} `;
    if (searchName) {
      filter += `where Name like '%${searchName}%'`;
    }
    filter += " order by id desc";

    sql += filter;

    sql += ` limit :limit offset :offset`;

    const [list] = await db.query(sql, { offset, limit });

    const [totalRecord] = await db.query(
      `select count(*) as totalRecord from ${table} ${filter}`
    );

    return { list, totalRecord: totalRecord[0]?.totalRecord || 0 };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getList, create, update, remove };
