const express=require('express')
const cors=require("cors")
const {connection}=require("./Medels/InstructorloginModel")
const { InsturctorauthRouter } = require('./Controls/Instructorlogin')
const app=express()
app.use(cors())
app.use(express.json())

app.use("/instructer",InsturctorauthRouter)
app.listen(8080,async(req,res)=>{
   try{

   await connection
    console.log("connected to database ") }catch(err){
        console.log(err)
    }
    console.log("port is running fine at port no.8080")
})
