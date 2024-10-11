const fs = require("fs").promises;
const path = require("path");
const moment = require("moment");
const logError = async ({ name, message, res }) => {
  try {
    // console.log({ name, message });
    const timestamp = moment().format("DD-MM-YYYY HH:mm:ss");
    const logFilePath = path.join(__dirname, "../", "logs", `${name}.txt`);
    fs.appendFile(logFilePath, `${timestamp} error: ${message}\n\n`);
  } catch (error) {
    console.log(error);
  }
  res.status(500).send("Internal Server Error");
};

let IsLoggedIn = false;

const setLogin = () => {
  IsLoggedIn = true;
};

module.exports = { logError, IsLoggedIn, setLogin };
