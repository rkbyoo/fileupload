const mongoose=require("mongoose")

const fileSchema=mongoose.Schema({
    name:{
        type:string,
        required:true
    },
    imageUrl:{
        type:string,
        required:true
    },
    tags:{
        type:string,
        required:false
    },
    email:{
        type:string,
        required:true
    }
    
})

module.exports=mongoose.model("File",fileSchema)