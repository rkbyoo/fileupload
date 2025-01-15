const mongoose=require("mongoose")

const fileSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    tags:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:true
    }
    
})

module.exports=mongoose.model("File",fileSchema)