const mongoose=require("mongoose")

const UserSchema=mongoose.Schema({

    cell_no:{required:true,type:string},
    first_name:{required:true,type:string},
    last_name:{required:true,type:string},  
    address:{required:true,type:string},
    email:{required:true,type:string},
    user_id:{required:true,type:Int}    
})
const model= mongoose.model("user",userSchema)
model.exports=model;