// Middleware to check user role
const db = require("../database/db");
const checkRole = async (requiredRole, req, res, next) => {
  const _checkRole = async (req, res, next) => {
    try {
      const userId = req?.id;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      } else {
        const sqlEmployee = "SELECT RoleId FROM employee WHERE Id = :id";
        const [result] = await db.query(sqlEmployee, {
          id: userId,
        });

        if (result?.[0]?.RoleId) {
          const roleId = result[0].RoleId;
          const sqlRole =
            "select * from access_role join access_key on access_key.Id = access_role.AccessKeyId where RoleId = :roleId";
          const [_role] = await db.query(sqlRole, {
            roleId,
          });

          const role = _role?.map((item) => item.Code);
          //   ["Employee","employee_delete"]
          if (role?.includes(requiredRole)) {
            return next();
          } else {
            return res.status(401).json({
              message: "Unauthorized",
            });
          }
        } else {
          return res.status(401).json({
            message: "Unauthorized",
          });
        }
      }
      next();
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  };
  return _checkRole(req, res, next);
};

module.exports = { checkRole };
