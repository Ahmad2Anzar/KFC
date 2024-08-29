import multer from "multer"
import path from "path"

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const upload=multer({
    
    storage:storage,
    limits:{fileSize:1024*1024*2},
    fileFilter:function(req,file,cb){
        const filetypes=/jpeg|jpg|png|gif/
        const mimetype=filetypes.test(file.mimetype)
        const extname=filetypes.test(path.extname(file.originalname).toLocaleLowerCase())

        if(mimetype&&extname){
            
            return cb(null,true)
            
        }
        else{
            cb(new Error('only images are allowed'))
        }
    }
    
})

export default upload