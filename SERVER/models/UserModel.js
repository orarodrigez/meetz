const mongoose=require("mongoose")

const UserSchema=mongoose.Schema({

    cell_no:{required:true,type:String},
    first_name:{required:true,type:String},
    last_name:{required:true,type:String},  
    address:{required:true,type:String},
    email:{required:true,type:String},
    user_id:{required:true,type:Number}    
})
const model= mongoose.model("user",UserSchema)
model.exports=model;