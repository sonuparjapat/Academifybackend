const express=require('express')
const { instructorModel } = require('../Medels/Instructermodel')
const InstructorRouter=express.Router()
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
       
    
        const data=await instructorModel.find(querydata).sort({[sort]:order=="asc"?"1":order=="desc"?"-1":""}).skip((page-1)*limit).limit(limit)
        res.status(200).json({msg:data}) 
     
            

       
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
module.exports={InstructorRouter}