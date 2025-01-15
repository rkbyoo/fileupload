const cloudinary = require('cloudinary');
require("dotenv").config()


exports.connectCloudinary=()=>{
    try {
        cloudinary.v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key:  process.env.API_KEY,
            api_secret: process.env.API_SECRET ,
            secure: true,
          }); 

          console.log("connected with cloudinary")
    } catch (error) {
        console.log("some error while connecting to cloud database")
        console.error(error)
        process.exit(1)
    }
}