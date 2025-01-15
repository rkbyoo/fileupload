const mongoose=require("mongoose")
require("dotenv").config()


const connectDb=mongoose.connect(process.env.MONGODB_URL)
.then(()=>{console.log("database connected successfully")})
.catch((e)=>{
    console.log("some error while connecting the database",e)
    process.exit(1)
})


module.exports=connectDb