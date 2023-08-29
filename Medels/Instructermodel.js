const mongoose=require("mongoose")

require("dotenv").config()
const connection=mongoose.connect(process.env.MongoUrl)
const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    gender:{type:String,required:true},
    department:{type:String,required:true},
    mob:{type:String,required:true},
    email:{type:String,required:true}
})
const instructorModel=mongoose.model("Instructordata",userSchema)
module.exports={
    connection,instructorModel
}