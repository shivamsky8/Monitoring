const express = require("express");
const favicon = require("express-favicon");

const port = 8000;
const routes = require("./routes");
const app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
app.use((req, res, next) => {
  req.headers.origin = req.headers.origin || req.headers.host;
  next();
});
app.use("/rest", routes);

module.exports = app;
