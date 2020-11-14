const express = require("express");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const webpush = require('web-push');
const path = require('path');

// Route Imports
const auth_Router = require("./routes/auth");
const logger_Router = require('./routes/logger');
const survey_Router = require("./routes/node/survey");
const config = require('./config/config');

// middlewares

const errorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const colors = require("colors");

// load ENV vars
dotenv.config({ path: "./config/config.env" });
const app = express();

// cookie parser
app.use(cookieParser());
// Body Parser
app.use(express.json());

app.use("/logo", express.static("logo"));
app.use("/upload", express.static("upload"));
app.use(express.static(path.join(__dirname, "client")))
// app.use("/logo", express.static("upload/bank_logos"));
// app.use("/public", express.static("public"));
app.use("/posts", express.static("posts"));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(bodyparser.urlencoded({ extended: false }));
// app.use(urlEncoded());

// Connect DB
connectDB();

// cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Route files
app.use("/api", auth_Router);
app.use('/api/logger', logger_Router);
app.use('/api/survey', survey_Router);

// truncate user data completely from db
// app.use('/api/truncate', truncateDB_Router);

app.use(errorHandler);

app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


const PORT = process.env.PORT || 5000;

console.log(process.env.PORT)
let date = new Date();
console.log(date);

const server = app.listen(PORT, (req, res) => {
  console.log(`listening to requests on port ${PORT}`);
});

// handle Unhandled promise rejections

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);

  // CLose server and exit process
  server.close(() => process.exit(1));
});

// webpush.setVapidDetails('mailto: test@test.com', process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY);

// app.post('/subscribe', async (req, res, next) => {
//   const subscription = req.body

//   console.log(req.body)

//   const payload = JSON.stringify({
//     title: 'Hello!',
//     body: 'It works.',
//   })

//   try {

//     const wbp = await webpush.sendNotification(subscription, payload)

//     res.status(200).json({ 'success': true })

//   } catch (err) {
//     next(err);
//   }
// });


// Private Key:
// np-2WOW84rU51a1fVZFFrBuRed6CNRZc2CIxfRr4pr4
