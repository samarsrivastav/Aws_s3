const { S3Client, GetObjectCommand ,PutObjectCommand ,ListObjectsCommand } = require ("@aws-sdk/client-s3");
const { getSignedUrl } = require ("@aws-sdk/s3-request-presigner");
const s3Client= new S3Client({
    region: "ap-south-1",
    credentials:{ //get by creating an access key with a new user
        accessKeyId:"get from bucket",
        secretAccessKey:"get from bucket",
    }
});
async function getObjectURL(key){
    const command= new GetObjectCommand({
        Bucket:"samar-piyush-tut-private", // bucket name
        Key:key,
    });
    const url = await getSignedUrl(s3Client,command);
    return url;
}
async function putObject(filename,contentype){
    const command = new PutObjectCommand({
        Bucket:"samar-piyush-tut-private",
        Key:`uploads/user-uploads/${filename}`,
        ContentType:contentype
    });
    const url =await getSignedUrl(s3Client,command);
    return url;
}
async function ListObject(){
    const command = new ListObjectsCommand({
        Bucket:"samar-piyush-tut-private",
        Key:"/",
    });
    const res= await s3Client.send(command);
    console.log(res);
}
async function init(){
    
    //to get signed url
    // console.log("url to get",await getObjectURL("myPic.jpeg")); 

    // to get signed url to upload 
    // console.log("url to upload",await putObject(`image-${Date.now()}.jpeg`,"image/jpeg"));

    // to gett all the data 
    await ListObject()
}
init();
