const File=require("../models/fileschema")


exports.localFileUpload=async(req,res)=>{
    try {
         //fetch the data from the request
    const file=req.files.file
    console.log("This is my file:",file)

    //declare the path for the file to store
    const path=__dirname + /files/ + Date.now() + `.${file.name.split('.')[1]}`
    console.log("this is path",path)

    //lets move the file to the path 
    file.mv(path,(err)=>{
        console.log("some error occured while moving the file",err)
    })
    res.status(200).json({
        success:true,
        message:"The file is uploaded successfully"
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Some error occured while uploading the file"
        })
    }
   

}