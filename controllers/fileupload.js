const File=require("../models/fileschema")
const cloudinary=require("cloudinary").v2


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
const uploadFileToCloudinary=async(file,folder,quality=100)=>{
    console.log({folder,quality})
    // i can pass down height as a object beside as well to change the dimensions
    
    //i have set resource_type to auto to auto detect the file type while uploading else it is set to image by default
    return await cloudinary.uploader.upload(file.tempFilePath,{folder,quality,resource_type:"auto"})




    //it will fetch the file from tempfilepath location and upload it to the desired folder (which is in object format) in the cloud cz it accepts value like {folder:'codehelp',quality:30} here the quality is scaled on 10 to 100
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
    const response=await uploadFileToCloudinary(imageFile,'codehelp')
     //filename and the folder where i want to save the file in cloudinary
    console.log(response)

    // saving the entry into DB
    try {
        const imageData=await File.create({name,
            email,
            tags,
            imageUrl:response.secure_url
        })
        res.status(200).json({
            success:true,
            message:"File is uploaded successfully"
            ,data:imageData
        })
    } catch (error) {
     console.error("not able to upload in the database",error)   
    }
    
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success:false,
            message:"something went wrong while uplading the image"
        })
    }
}



//video upload handler
exports.videoUpload=async(req,res)=>{

    try {
    //fetching data from req
    const videoFile=req.files.videoFile
    console.log(videoFile)
    const{name,email,tags}=req.body
    console.log(name,email,tags)

    //validation on video type
    let videoTypes=["mov","mp4"]
    const fileType=videoFile.name.split(".")[1].toLowerCase()
    console.log("File type is :",fileType)
    if(!videoTypes.includes(fileType))
    {
        return res.status(400).json({
            success:false,
            message:"Invalid format"
        })
    }
    //lets save it in cloudinary
    try {
        const response=await uploadFileToCloudinary(videoFile,'codehelp',50)
        console.log("this is response from cloudinary",response)
        //saving it in db
        const fileData=await File.create({
            name,
            email,
            tags,
            videoUrl:response.secure_url
        })
        return res.status(200).json({
            success:true,
            message:"The file is successfully uploaded",
            fileData:fileData
        })
    } catch (error) {
        console.log("some error occured while uploading",error)
        return res.status(400).json({
            success:false,
            message:"some uploading issues"
        })
    }
 

    } catch (error) {
        console.error("some internal server error",error)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }



}

//image upload by reducing its size 

exports.imageReduceUpload=async(req,res)=>{
    try {
        const imageFile=req.files.imageFile
        const {name,email,tags}=req.body
        console.log("this is my image file",imageFile)
        //validation on image file 
        const imgTypes=["jpeg","jpg","png"]
        const fileType=imageFile.name.split('.')[1].toLowerCase()
        console.log("this is my image type:",fileType)
        if(!imgTypes.includes(fileType)){
            return res.status(400).json({
                success:false,
                message:"The required File Type is missing"
            })
        }
        const response=await uploadFileToCloudinary(imageFile,'codehelp',60)
        console.log("this is the response from uploading at cloudinary",response)

        try {
             //lets make a entry in the db 
        const fileData=await File.create({
            name,
            email,
            tags,
            imageUrl:response.secure_url
        })
        return res.status(200).json({
            success:true,
            message:"File is uploaded successfully with compression",
            data:fileData
        })
        } catch (error) {
            console.error("some error occured while saving in database",error)
        }
       
        
    } catch (error) {
        console.error("some internal server error while uploading the image",error)
        res.status(500).json({
            success:false,
            message:"some internal server error"
        })
    }
   

}