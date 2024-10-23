const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const adminRoute = require("./routes/adminRoute");
const pageRoute = require("./routes/pageRoute");
const employeeRoute = require("./routes/employeeRoute");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const accessKeyRoute = require("./routes/accessKeyRoute");
const roleRoute = require("./routes/roleRoute");
const accessRoleRoute = require("./routes/accessRoleRoute");
const session = require("express-session");
const db = require("./database/db");
const { verifyToken } = require("./helper/auth");
const MySQLStore = require("express-mysql-session")(session);

app.use(
  cors({
    origin: "*",
  })
);

const sessionStore = new MySQLStore(
  { checkExpirationInterval: 1000 * 60 * 10 }, // clear from database expired sessions every 10 minutes
  db
);
// app.use((req, res, next) => {
//   const cookieHeader = req.headers.cookie;
//   let cookieValue = null;
//   if (cookieHeader) {
//     // Split the cookies and find the one we want
//     const cookies = cookieHeader.split("; "); // Split by "; "
//     cookies.forEach((cookie) => {
//       const [name, value] = cookie.split("=");
//       if (name === "isLogin") {
//         cookieValue = value === "true"; // Get the value of myCookie
//       }
//     });
//   }
//   console.log(cookieHeader, cookieValue);
//   req.isLoggedIn = cookieValue;
//   next();
// });

// Configure session middleware
// s%3A9xY82L4myUOqHk3kW05_9jMPEQFHs96z.S4oVRm6VClpQq6bIxpWSje0MUFBrPa%2F7ZWxFmbuCvWE

// s%3A9xY82L4myUOqHk3kW05_9jMPEQFHs96z.S4oVRm6VClpQq6bIxpWSje0MUFBrPa%2F7ZWxFmbuCvWE {isLogin: true, users = {"tesd": 123}}
app.use(
  session({
    secret: "slkfjsifjlksajfkjfiekdks1231#2", // Replace with a strong secret
    store: sessionStore,
    resave: true, // Forces session to be saved back to the session store
    saveUninitialized: false, // No empty sessions will be saved
    cookie: { secure: false, maxAge: 1000 * 60 * 1 }, // 10 minutes (in milliseconds) },
  })
);

// dafsdafasldkfjklsdajf
// sadfkoe1212/

// app.use("/", (req, res, next) => {
//   if (!req?.session?.isLogin) {
//     req.session.isLogin = false;
//   }
//   // console.log(req.session);
//   next();
// });

app.use("/api/get-image", express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoute);
app.use(pageRoute);

app.use("/api", verifyToken);
app.use(employeeRoute);
app.use(categoryRoute);
app.use(productRoute);
app.use(accessKeyRoute);
app.use(roleRoute);
app.use(accessRoleRoute);

app.listen(8081, () => {
  console.log("server started port 8081");
});
