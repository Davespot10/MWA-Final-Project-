const S3 = require('aws-sdk/clients/s3');
require('dotenv').config();

const bucketName =process.env.AWS_S3_BUCKET_NAME;
const region =process.env.AWS_S3_BUCKET_REGION;
const accessKey =  process.env.AWS_S3_ACCESS_KEY_ID;
const secretKey =process.env.AWS_S3_SECRET_ACCESS_KEY;

const s3 = new S3({
    region,
    accessKey,
    secretKey
});