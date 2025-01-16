const File=require("../models/fileschema")
const cloudinary=require("cloudinary")


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




//function to upload the file to cloudinary
const uploadFileToCloudinary=async(file,folder)=>{
    const options={folder}
    console.log(options)
    return await cloudinary.uploader.upload(file.tempFilePath,options)
    //it will fetch the file from tempfilepath location and upload it to the desired folder (option) in the cloud
}
//image upload handler

exports.imageUpload=async(req,res)=>{
    try {
          //fetch the data from the frontend 
    const {name,tags,email}=req.body
    const imageFile=req.files.imageFile
    console.log("image file is this:",imageFile)

    //lets setup the validation while uploading the file
    const imgTypes=["jpg","jpeg","png"]
    const fileType=imageFile.name.split('.')[1].toLowerCase()
    console.log("my image file type is:",fileType)

    if(!imgTypes.includes(fileType)){
        
        return res.status(400).json({
            success:false,
            message:"The image format is not supported"
        })
        
    } 
    const response=await uploadFileToCloudinary(imageFile,"codehelp") //filename and the folder where i want to save the file in cloudinary

    // saving the entry into DB
    // const fileData=await File.create({name,
    //     email,
    //     tags,
    //     imageUrl
    // })
    res.status(200).json({
        success:true,
        message:"File is uploaded successfully"
    })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success:false,
            message:"something went wrong while uplading the image"
        })
    }
}
