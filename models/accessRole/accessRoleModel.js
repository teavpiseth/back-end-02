const Joi = require("joi");
const db = require("../../database/db");
const logs = require("../../helper/writeLog");

const table = "access_role";

const create = async (req, res) => {
  try {
    var resultReturn;
    const selectSql = `SELECT * FROM ${table} where RoleId = :roleId`;
    const [_result] = await db.query(selectSql, {
      roleId: req.body.roleId,
    });
    //  [1,334] // result
    if (req.body.add.length > 0) {
      // if has add
      // [1,2,334,8] // body
      const add = [];
      req.body.add.forEach((accessKeyId) => {
        1;
        const isAlreadyExist = _result?.find(
          (result) => Number(result.AccessKeyId) === Number(accessKeyId)
        );
        if (!isAlreadyExist) {
          add.push(accessKeyId);
        }
      });

      const sql = `INSERT INTO ${table} (AccessKeyId, RoleId) VALUES ?`;

      if (add.length > 0) {
        const values = add.map((value) => [value, req.body.roleId]);
        const [result] = await db.query(sql, [values]);
        if (result) {
          resultReturn = result;
        }
      }
    }
    if (req.body.remove.length > 0) {
      const remove = [];
      req.body.remove.forEach((accessKeyId) => {
        const isAlreadyExist = _result?.find(
          (result) => Number(result.AccessKeyId) === Number(accessKeyId)
        );
        if (isAlreadyExist) {
          remove.push(accessKeyId);
        }
      });

      for (let i = 0; i < remove.length; i++) {
        const sql = `DELETE FROM ${table} WHERE AccessKeyId = :accessKeyId AND RoleId = :roleId`;

        const [result] = await db.query(sql, {
          accessKeyId: remove[i],
          roleId: req.body.roleId,
        });
        if (result) {
          resultReturn = result;
        }
      }
    }

    return resultReturn;
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
