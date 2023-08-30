const express=require('express')
const { instructorModel } = require('../Medels/Instructermodel')
const InstructorRouter=express.Router()
InstructorRouter.get("/userprofile",async(req,res)=>{
    const {instId}=req.body
    const data=await instructorModel.findOne({_id:instId})
    try{
        res.status(200).json({msg:data,username:data.name,useremail:data.email,id:data._id})
    }catch(err){
        res.status(400).json({msg:err})
    }
})
InstructorRouter.get("/instructers",async(req,res)=>{
    const {name,department,mob,gender,email,sort,order,limit,page}=req.query
//    console.log(req.query)
    const querydata={}
    if(name){
        querydata.name={ $regex: name, $options: "i" }
    }
    if(department){
        querydata.department=department
    }
    if(mob){ 
        querydata.mob={ $regex:mob, $options: "i" }
    }
    if(gender){
        querydata.gender=gender
    }
    if(email){
        querydata.email={ $regex: email, $options: "i" }
    }
  
    try{
       const maindata=await instructorModel.find(querydata)
    if(limit&&page){
        const data=await instructorModel.find(querydata).sort({[sort]:order=="asc"?"1":order=="desc"?"-1":""}).skip((page-1)*limit).limit(limit)
        res.status(200).json({msg:data,totalpages:Math.ceil(maindata.length/limit)}) 
    }
      else{
        const data=await instructorModel.find(querydata).sort({[sort]:order=="asc"?"1":order=="desc"?"-1":""})
        res.status(200).json({msg:data}) 
      }
     
            

       
        }catch(err){
            res.status(400).json({msg:err})
        }
    
})
InstructorRouter.post("/profile",async(req,res)=>{
    const {email}=req.body
    const data=await instructorModel.findOne({email})
    if(!data){
        try{
            const specificDate = new Date(2023, 7, 29, 12, 0, 0);
            const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    const formattedDate = specificDate.toLocaleString('en-IN', options);
    const newdata={...req.body,date:formattedDate}
    
            const data=new instructorModel(newdata)
            await data.save()
            res.status(200).json({msg:"Profile Created Successfully"})
        }catch(err){
            res.status(400).json({msg:err})
        }
    }else{
        res.status(400).json({msg:"profile Already created you can edit it"})
    }
    
})
InstructorRouter.patch("/profile/edit/:id",async(req,res)=>{
    const {id}=req.params
    const {instId}=req.body
    const data=await instructorModel.findOne({_id:id})
    // console.log(instId,data)
    try{
if(req.body.instId==data.instId){
    await instructorModel.findOneAndUpdate({_id:id},req.body)
    res.status(200).json({msg:`Instructer with ${id} updated successfully`})
}else{
    res.status(400).json({msg:"You are not authorised to do this"})
}
    }catch(err){
        res.status(400).json({"msg":err})
    }
})

InstructorRouter.delete("/profile/delete/:id",async(req,res)=>{
    const {id}=req.params
    const {instId}=req.body
    const data=await instructorModel.findOne({_id:id})
    // console.log(instId,data)
    try{
if(req.body.instId==data.instId){
    await instructorModel.findOneAndDelete({_id:id})
    res.status(200).json({msg:`Instructer with ${id} deleted successfully`})
}else{
    res.status(400).json({msg:"You are not authorised to do this"})
}
    }catch(err){
        res.status(400).json({"msg":err})
    }
})
module.exports={InstructorRouter}