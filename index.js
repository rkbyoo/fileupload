const express=require("express")
const app=express()
const cloudinary=require("cloudinary")

//installing file upload middleware for uploading files
const fileupload=require("express-fileupload")
app.use(fileupload())

//importing the .env here and also adding middleware
require("dotenv").config()
app.use(express.json())

PORT=process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`The server is running on port ${PORT}`)
})

app.get("/",(req,res)=>{
    res.send("Welcome to the homepage")
})


//lets connect the database
const {connectDb}=require("./config/database")
connectDb()

const {connectCloudinary}=require("./config/cloudinary")
connectCloudinary()

//lets import the routes 
const fileroute=require("./routes/fileroute")
app.use("/api/v1",fileroute) //mounting is done
