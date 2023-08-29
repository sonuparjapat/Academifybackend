const express=require('express')
const cors=require("cors")
const { connection } = require('./Medels/Instructermodel')
const app=express.json()
app.use(cors())
app.use(express.json())


app.listen(8080,async(req,res)=>{
   try{

   await connection
    console.log("connected to database ") }catch(err){
        console.log(err)
    }
    console.log("port is running fine at port no.8080")
})
