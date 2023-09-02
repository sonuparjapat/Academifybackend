const mongoose=require("mongoose")

const studentassignmentschema=mongoose.Schema({
    link:String,
    status:Boolean,
    instId:String,
    assignmentId:String,
    userId:String
})

const studentassignemntModel=mongoose.model("studentassignmentsubmission",studentassignmentschema)
module.exports={studentassignemntModel}