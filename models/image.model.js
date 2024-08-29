import mongoose from "mongoose";


const imageSchema = mongoose.Schema({
    filename: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    userId:{
      type:mongoose.Schema.Types.ObjectId,ref:"user",required:true
    }
  });
  
  const imageModel = mongoose.model('Image', imageSchema);

  export default imageModel