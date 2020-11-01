const dotenv = require("dotenv");
dotenv.config();
const config = require("./config");
const express = require("express");
// const fs = require('fs');
/**
 * Middlewares declarations
 */
// Handling cors
const cors = require("cors");
// Body parser for req/res
const bodyParser = require("body-parser");
// Nice cool logger (Bunyan)
const logger = require("./logger")();
// Express-session for maintaining sessions
// const session = require('express-session');
// Redis client (Async using bluebird)
const client = require("./redis").getClient;

/**
 * Other variables
 */
// Configure isProduction variable
const isProduction = config["env"] === "production";
// Initialize app
const app = express();

/**
 * Application Middlewares
 */
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

// Configure databases here.
const mongo = require("./mongo");

// Aws import
// const multer = require('multer');
// const upload = multer({
//     dest: 'uploads/'
// });
/**
 * Routes
 */
// app.post("/api/v1/upload", upload.single('image'), (req, res, next) => {
//     const file = req.file;
//     var params = {
//         Bucket: 'shorts-b',
//         Key: "uploads/" + Date.now() + "_" + file.originalname, //file.name doesn't exist as a property
//         Body: fs.createReadStream(file.path)
//     };
//     s3.upload(params, function (err, data) {
//         // Whether there is an error or not, delete the temp file
//         fs.unlink(file.path, function (err) {
//             if (err) {
//                 logger.error(err);
//             }
//         });
//         if (err) {
//             logger.error('ERROR MSG: ', err);
//             res.status(500).send(err);
//         } else {
//             logger.info('Successfully uploaded data');
//             res.status(200).end();
//         }
//     });
// });

app.get("/", (req, res, next) => {
  res.send({
    code: 200,
    message: "Faad chal rha hai.",
  });
});

app.use("/api/v1", require("./routes/user")({ logger }));

app.use("/api/v1", require("./routes/address")({ logger }));

app.use("/api/v1", require("./routes/category")({ logger }));

app.use("/api/v1", require("./routes/item")({ logger }));
app.use("/api/v1", require("./routes/cart")({ logger }));

app.use("/api/v1/auth", require("./routes/auth")({ logger }));

/**
 * Error handlers & middlewares
 */
app.use((err, req, res, next) => {
  logger.error(`[${req.method}][${req.url}] - ${JSON.stringify(err)}`);
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      stack: isProduction ? {} : err,
    },
  });
});

/**
 * Server
 */
app.listen(config["port"], () => {
  console.log(`Server listening on port: ${config["port"]}`);
});
