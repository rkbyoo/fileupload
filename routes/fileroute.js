const express=require("express")
const router=express.Router()


//importing the handler here
const {imageUpload,videoUpload,imageReduceUpload,localFileUpload}=require("../controllers/fileupload")



//routes for the server are declared here
router.post("/localfileupload",localFileUpload)



module.exports=router