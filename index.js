const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const adminRoute = require("./routes/adminRoute");
const pageRoute = require("./routes/pageRoute");
const employeeRoute = require("./routes/employeeRoute");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/get-image", express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoute);
app.use(pageRoute);
app.use(employeeRoute);
app.use(categoryRoute);
app.use(productRoute);

app.listen(8081, () => {
  console.log("server started port 8081");
});
