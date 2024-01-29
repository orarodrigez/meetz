const mongoose=require("mongoose");

const UserSchema=mongoose.Schema({

    cell_no:{required:true,type:String},
    email:{required:true,type:String},
    password:{required:true,type:String},
    first_name:{required:true,type:String},
    last_name:{required:true,type:String},  
    city:{required:true,type:String},
    street:{required:false,type:String},
    house_no:{required:false,type:String},
    enter_no:{required:false,type:String},
    building:{required:false,type:String},
    zip_id:{required:true,type:String},
    pob:{required:false,type:String},
    user_id:{required:true,type:Number} ,
    role:{required:true,type:Number}  
} )
const model = mongoose.model("user",UserSchema)

module.exports=model;