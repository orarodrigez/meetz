const mongoose=require("mongoose")

const ProductSchema=mongoose.Schema({
 
prodName:{required:true,type:String},
price:{required:true,type:Number},
description:{required:true,type:String},
picture1:{required:true,type:{
		data: Buffer,
		contentType: String}
},
picture2:{required:true,type:{
    data: Buffer,
    contentType: String}
},
picture3:{required:true,type:{
    data: Buffer,
    contentType: String}
},
stock:{required:true,type:Number},
prodId:{required:true,type:Number}
})



const model= mongoose.model("Product",ProductSchema)
module.exports=model;

