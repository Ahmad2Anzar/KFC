import jwt from "jsonwebtoken"

import userModel from "../models/user.model.js"

const authentification=async (req,res,next)=>{
    
    if(!req.headers.authorization){
        return res.status(500).json({message:"token notttttt found"})
    }
    const token=req.headers.authorization.split(' ')[1]
    if(!token){
        return res.status(400).json({message:"token not found"})
    }
    try {
        const decoded=jwt.verify(token,process.env.SECRET_KEY)
        if(!decoded)
        {
            return res.status(400).json({message:"token is invalid"})
        }

        const user=await userModel.findById(decoded.id)
        req.user=user
        
        next()
    } catch (error) {
        res.status(501).json({message:"something went wrong"})
    }
}   
export default authentification