import express from "express"
import authentification from "../middleware/authenication.js"
import authorisation from "../middleware/authorisation.js"
import upload from "../config/multer.config.js"
import imageModel from "../models/image.model.js"
import fs from "fs"

const photoRouter=express.Router()

photoRouter.post("/upload",[authentification,authorisation(['user','admin']),upload.single('file')],async(req,res)=>{
    try {
              
                const image=new imageModel({
                    filename:req.file.filename,
                    path:`uploads/${req.file.filename}`,
                    contentType:req.file.mimetype,
                    size:req.file.size,
                    userId:req.user._id
                })
                console.log(image)
                await image.save()
                res.send("image saved successfully")
            } catch (error) {
                
            }
})

photoRouter.delete("/delete/:id",[authentification,authorisation(['admin'])],async (req,res)=>{
    
    const _id=req.params.id
        
    try {
        const photo=await imageModel.findById(_id)
        console.log(photo)
        fs.unlinkSync(`${photo.path}`)
        await imageModel.findByIdAndDelete(_id)
        res.send('hiii')
    } catch (error) {
     console.log(error)   
    }
   
})

export default photoRouter