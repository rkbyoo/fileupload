const express=require("express")
const app=express()

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
const connectDb=require("./config/database")
connectDb()

const connectCloud=require("./config/cloudinary")
connectCloud()

//lets import the routes 
const fileroute=require("./routes/fileroute")
app.use("/api/v1",fileroute) //mounting is done