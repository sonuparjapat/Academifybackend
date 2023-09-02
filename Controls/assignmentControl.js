const express=require("express")
const { instructerassignmentModel } = require("../Medels/instructerAssignment")
const { studentProfileModel } = require("../Medels/studentProfileMoedel")
const assignmentRouter=express.Router()

assignmentRouter.post("/instructerassignment",async(req,res)=>{
    
 try{
const data=new instructerassignmentModel(req.body)
await data.save()
res.status(400).json({msg:"You added a new assignment successfully"})
 }catch(err){
    res.status(400).json({msg:"something going wrong"})
 }


})
assignmentRouter.get("/allinstructerassignment",async(req,res)=>{
const {date,deadline,name,limit,page,order,sort}=req.query
const {userId}=req.body
const myquery={}
if(date){
    myquery.date=date
}
if(deadline){
    myquery.deadline=deadline
}
if(name){
    myquery.name={ $regex: name, $options: "i" }
}
if(userId){
    myquery.userId=userId
}


try{
    if(page&&limit){

    const maindata=instructerassignmentModel.find(myquery)
const data=await instructerassignmentModel.find(myquery).sort({[sort]:order=="asc"?"1":order=="desc"?"-1":""}).skip((page-1)*limit).limit(limit)
res.status(200).json({msg:data,totalpages:Math.ceil(maindata.length/limit)}) }else{
    const data=await instructerassignmentModel.find(myquery).sort({[sort]:order=="asc"?"1":order=="desc"?"-1":""})
    res.status(200).json({msg:data})
}
}


catch(err){
    res.status(400).json({msg:"something going wrong"})
}
})
assignmentRouter.delete("/deleteassignment/:id",async(req,res)=>{
const {id}=req.params
const data=await instructerassignmentModel.findOne({_id:id})
try{
    if(req.body.userId!==data.userId){
        res.status(400).json({msg:"You are not authorised to do this task"})
    }else{
        await instructerassignmentModel.findOneAndDelete({_id:id})
    res.status(200).json({msg:`task deleted with id:${id} successfully`})
    }
}catch(err){
    res.status(400).json({msg:"something going wrong"})
}
})

assignmentRouter.patch("/patchassignment/:id",async(req,res)=>{
    const {id}=req.params
    const data=await instructerassignmentModel.findOne({_id:id})
    try{
        if(req.body.userId!==data.userId){
            res.status(400).json({msg:"You are not authorised to do this task"})
        }else{
            await instructerassignmentModel.findOneAndUpdate({_id:id},req.body)
        res.status(200).json({msg:`task updated with id:${id} successfully`})
        }
    }catch(err){
        res.status(400).json({msg:"something going wrong"})
    }
    })



// studentsidemanagement************************************************************************************************

assignmentRouter.get("/getassignments",async(req,res)=>{
const {userId}=req.body
const {sort,order,limit,page,date,name}=req.query
const myquery={}
if(date){
    myquery.date=date
}
if(name){
    myquery.name={ $regex: name, $options: "i" }
}
const userprofile=await studentProfileModel.findOne({"userId":userId})
const studentfield=userprofile.major
if(studentfield){
    myquery.type=studentfield
}
if(userprofile){
    try{

if(limit&&page){
    const maindata=await instructerassignmentModel.find(myquery)
    const assignmentdata=await instructerassignmentModel.find(myquery).sort({[sort]:order=="asc"?"1":order=="desc"?"-1":""}).skip((page-1)*limit).limit(limit)
    res.status(200).json({msg:assignmentdata,totalpages:Math.ceil(maindata.length/limit)}) }else{
        const data=await instructerassignmentModel.find(myquery).sort({[sort]:order=="asc"?"1":order=="desc"?"-1":""})
        res.status(200).json({msg:data})}
     


    }catch(err){
        res.status(400).json({"msg":"something going wroing"})
    }
}


})











module.exports={assignmentRouter}