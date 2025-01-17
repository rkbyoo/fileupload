const mongoose=require("mongoose")

const fileSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:false
    },
    tags:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:true
    },
    videoUrl:{
        type:String,
        required:false
    }
})

module.exports=mongoose.model("File",fileSchema)