
import crypto from 'crypto'
const S3 = require('aws-sdk/clients/s3');
require('dotenv').config();
const randomBytes = promisify(crypto.randomBytes);

const bucketName =process.env.AWS_S3_BUCKET_NAME;
const region =process.env.AWS_S3_BUCKET_REGION;
const accessKey =  process.env.AWS_S3_ACCESS_KEY_ID;
const secretKey =process.env.AWS_S3_SECRET_ACCESS_KEY;

const s3 = new S3({
    region,
    accessKey,
    secretKey
});


export async function  uploadFile(file) {
    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex')
    var params = { 
        Bucket: bucketName, 
        Key: imageName, 
        Expires: 3600,
        ContentType:file.data.type };
    var url= s3.getSignedUrl('putObject',params);
     this.http.put(url, file.data).subscribe((res) => {
        console.log(res)
       
        
    })

    return url;
  }


  
