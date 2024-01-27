const mongoose=require("mongoose")

const UserSchema=mongoose.Schema({

    cell_no:{required:true,type:String},
    email:{required:true,type:String},
    password:{required:true,type:String},
    first_name:{required:true,type:String},
    last_name:{required:true,type:String},  
    city:{required:true,type:String},
    street:{required:true,type:String},
    house_no:{required:true,type:Number},
    enter_no:{required:true,type:Number},
    building:{required:true,type:Number},
    zip_id:{required:true,type:Number},
    pob:{required:true,type:String},
    user_id:{required:true,type:Number}    
})
const model= mongoose.model("user",UserSchema)
model.exports=model;