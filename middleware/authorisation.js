const authorisation=(permitted_role)=>{
  return  function(req,res,next){
        
        const userROle=req.user.role
        if(permitted_role.includes(userROle))
        {next()}
        else{return res.send("u are un authorised ")}
    }
}
export default authorisation