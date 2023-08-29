const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    gender:{type:String,required:true},
    department:{type:String,required:true},
    mob:{type:String,required:true},
    email:{type:String,required:true},
    
    date:String,
    instId:String
})
const instructorModel=mongoose.model("Instructordata",userSchema)
module.exports={
    instructorModel
}