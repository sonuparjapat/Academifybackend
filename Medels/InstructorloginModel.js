const mongoose=require("mongoose")
require("dotenv").config()
const connection=mongoose.connect(process.env.MongoUrl)
const instructorloginschema=mongoose.Schema({
email:{type:String,required:true},
password:{type:String,required:true},
name:{type:String,required:true}
})

const instructorloginmodel=mongoose.model("instructerlogindata",instructorloginschema)
module.exports={connection,instructorloginmodel}