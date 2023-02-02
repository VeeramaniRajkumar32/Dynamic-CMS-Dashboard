require('dotenv').config({
  path: `./${process.env.NODE_ENV || 'development'}.env`,
});
const conn = require("./config/dbConn.js")
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const indexRouter = require('./router/index')
const cookieParser = require('cookie-parser');
//Configuring cookie-parser
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
// app.use('./uploads', express.static('uploads'));

// view engine setup
app.set("views", __dirname + "/views");
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(indexRouter);

app.use((req, res) => {
  res.status(404).render('../views/pages/404');
});


const port = process.env.PORT;
app.listen(port, () => {
    console.log("I am running..........",port);
});
module.exports = app;
