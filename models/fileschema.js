const mongoose=require("mongoose")
const {transporter}=require("../config/mailconfig")
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
 //just after saving to the database it will run the function to send the mail,here doc argument will consist the information which is being saved
fileSchema.post("save",async function(doc){
    try {
        console.log("inside of docs:",doc)
        console.log("transporter",transporter)
        let info=await  transporter.sendMail({
            from:"Ghar.com",
            to:doc.email,
            subject:"hello",
            text:"Your image has been successfully uploaded"
            ,html:`<h1>View Your uploaded image:<a href="${doc.imageUrl}">${doc.imageUrl}</a></h1>`
           })
           console.log("info of uploaded mail",info)
    } catch (error) {
        console.log("some error occured while saving and sending mail",error)
    }
    
})
module.exports=mongoose.model("File",fileSchema)
