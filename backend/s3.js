// const multerS3 = require('multer-s3');
// const multer = require('multer');
// const shortid = require('shortid');
// // const AWS = require('aws-sdk');
// require('dotenv').config();

// const bucketName = process.env.AWS_S3_BUCKET_NAME;
// const region = process.env.AWS_S3_BUCKET_REGION;
// const accessKey = process.env.AWS_S3_ACCESS_KEY_ID;
// const secretKey = process.env.AWS_S3_SECRET_ACCESS_KEY;


// const AWS = require('aws-sdk');
// const fs = require('fs');
// const path = require('path');

// //configuring the AWS environment
// AWS.config.update({
//     accessKeyId: accessKey,
//     secretAccessKey: secretKey,
//     region:region
//   });

// var s3 = new AWS.S3();
// // var filePath = "./middleware/data/add_item.png";

// //configuring parameters
// var params = {
//   Bucket:bucketName,
//   Body : fs.createReadStream(filePath),
//   Key : "laf/"+Date.now()+"_"+path.basename(filePath)
// };

// s3.upload(params, function (err, data) {
//   //handle error
//   if (err) {
//     console.log("Error", err);
//   }

//   //success
//   if (data) {
//     console.log("Uploaded in:", data.Location);
//   }
// });



// const s3 = new AWS.S3({
//   accessKey,
//   secretKey,
//   region,
// });
// let BUCKET;

// module.exports.createBucket = bucketName = s3
//   .createBucket({
//     Bucket: bucketName,
//     acl: 'public-read',
//     CreateBucketConfiguration: {
//       LocationConstraint: region,
//     },
//     GrantFullControl: '',
//     ObjectLockEnabledForBucket: false,
//   })
//   .promise()
//   .then((bucketName) => {
//     console.log('Bucket Name ', bucketName);
//     BUCKET = bucketName.Location;
//   });

//   const uploadFile = (file, contentType, serverPath, filename)=>{
//     if(!filename){
//         filename = serverPath.split('/').pop()
//     };
//     return s3.upload({

//     })

//   }

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: bucketName,
//     acl: 'public-read',
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//       cb(null, shortid.generate() + '-' + file.originalname);
//     },
//   }),
// });

// module.exports = upload;
