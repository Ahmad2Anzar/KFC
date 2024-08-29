import express from "express"
import dotenv from "dotenv"
import  connection  from "./config/db connection.js"
import userRouter from "./Routes/user.routes.js"
import photoRouter from "./Routes/photo.routes.js"


dotenv.config()
let PORT=process.env.PORT||3001
let server=express()
server.use(express.json())
server.use("/user",userRouter)
server.use( express.static('uploads'));
server.use("/photo",photoRouter)



    

 

server.listen(PORT,async ()=>{
    try {
        await connection
        console.log("server is running on PORT "+PORT+" and connected to database")
    } catch (error) {
        console.log (error)
    }
}
)