const express=require("express")
const router=express.Router()


//importing the handler here




//routes for the server are declared here
router.post("/fileupload",fileUploadHandler)



module.exports=router