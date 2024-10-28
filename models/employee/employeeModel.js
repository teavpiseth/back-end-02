const Joi = require("joi");
const db = require("../../database/db");
const logs = require("../../helper/writeLog");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const create = async (req, res) => {
  try {
    const sql =
      "INSERT INTO employee (FirstName, LastName, Image, Gender, Dob, Tel, Address, Status, Password, RoleId) VALUES (:firstName, :lastName, :image, :gender, :dob, :tel, :address, :status, :password, :roleId)";
    const sqlCheck = "SELECT * FROM employee WHERE tel = :tel";
    const [check] = await db.query(sqlCheck, {
      tel: req.body.tel,
    });
    if (check.length > 0) {
      return { error: "tel already exists" };
    }
    const [result] = await db.query(sql, {
      ...req.body,
      image: req?.file?.filename,
      password: await bcrypt.hash(req.body.password, 10),
    });

    return result;
  } catch (error) {
    logs.logError({ name: "employee.create", message: error, res });
  }
};

const update = async (req, res) => {
  try {
    const sql1 =
      "UPDATE employee SET FirstName = :firstName, LastName = :lastName, Image= :image, Gender = :gender, Dob = :dob, Tel = :tel, Address = :address, Status = :status, RoleId = :roleId WHERE id = :id";
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
      sql += `where concat(FirstName,LastName) like '%${searchName.replaceAll(
        " ",
        ""
      )}%'`;
    }
    sql += " order by id desc";

    sql += ` limit :limit offset :offset`;
    const [list] = await db.query(sql, { offset, limit });

    const [totalRecord] = await db.query(
      "select count(*) as totalRecord from employee"
    );

    return { list, totalRecord: totalRecord[0]?.totalRecord || 0 };
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    // authentication
    const sql = "SELECT * FROM employee WHERE tel = :tel";
    const [result] = await db.query(sql, {
      tel: req.body.tel,
    });
    if (result?.[0]?.Status === 0) {
      return { error: "User is not active" };
    }
    if (result.length > 0) {
      if (await bcrypt.compare(req.body.password, result[0].Password)) {
        const payload = {
          user: result[0].FirstName,
          id: result[0].Id,
        };
        // create token
        var accessToken = jwt.sign(payload, "Sdafji@1213", {
          expiresIn: "1m",
        });
        var refreshToken = jwt.sign(payload, "Sdafji@1213", {
          expiresIn: "1d",
        });

        const sqlGetRole = `select * from access_role join access_key on access_key.Id = access_role.AccessKeyId where RoleId = :roleId`;
        const [_role] = await db.query(sqlGetRole, {
          roleId: result[0].RoleId,
        });
        const role = _role?.map((item) => {
          return item.Code;
        });
        return { result: { ...result[0], accessToken, refreshToken, role } };
      } else {
        return { error: "Password is wrong" };
      }
    } else {
      return { error: "Tel is wrong" };
    }
  } catch (error) {
    logs.logError({ name: "employee.login", message: error, res });
  }
};

module.exports = { getList, create, update, remove, login };
