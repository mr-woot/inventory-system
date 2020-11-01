const AWS = require("aws-sdk");
const config = require("./config");

const options = {
  accessKeyId: config["aws_access_key_id"],
  secretAccessKey: config["aws_secret_access_key"],
  region: config["aws_region"]
};

AWS.config.update(config);

const s3 = new AWS.S3({
  apiVersion: "2006-03-01"
});

// Call S3 to list the buckets
// s3.listBuckets(function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data.Buckets);
//   }
// });

module.exports = {
  AWS,
  s3
};
