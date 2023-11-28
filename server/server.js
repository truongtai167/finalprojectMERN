const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/dbconnect");
const initRouter = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "PUT", "GET", "DELETE"],
    credentials: true,
  })
);
const port = process.env.PORT || 8080;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();
initRouter(app);

app.use("/", (req, res) => {
  res.send("server is running ...");
});

app.listen(port, () => {
  console.log(`server in running on port : ${port}`);
});
