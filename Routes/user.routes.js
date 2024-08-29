import express from "express"
import bcrypt from "bcrypt"
import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"

const userRouter=express.Router()

userRouter.post("/register",async (req,res)=>{
 const {name,email,password,gender,age,role}=req.body
 try {
     bcrypt.hash(password,5,async (err,hash)=>{
        if(err){
          return res.status(500).json({message:"internal server issue"})
        }
        else{
             const user=new userModel({
            name,
            email,
            password:hash,
            gender,
            age,
            role
        })
        await user.save()
      return  res.status(201).json({message:"user registered successfully"})
    }
     })
 } catch (error) {
   return res.status(500).json({message:`${error}`})

 }
})

userRouter.post("/login",async (req,res)=>{
    const {email,password}=req.body
    try {
        const user=await userModel.findOne({email})
        if(!user){return res.status(400).json({message:"invalid user email"})}
        else{
            bcrypt.compare(password,user.password,async(err,result)=>{
                if(err){
                  return  res.status(500).json({message:"internal server issue"})
                }
                if(result){
                    const accessToken=jwt.sign({id:user._id},process.env.SECRET_KEY)
                    const refreshToken=jwt.sign({id:user._id},process.env.SECRET_KEY2)
                    return res.status(200).json({message:"login successful",accessToken,refreshToken})
                }
                else{
                    return  res.status(500).json({message:"wrong password"})
                }
            })
        }
    } catch (error) { 
        return  res.status(500).json({message:`${error}`})
        
    }
})

export default userRouter