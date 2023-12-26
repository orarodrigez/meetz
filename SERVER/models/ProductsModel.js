const mongoose=require("mongoose")

const ProductSchema=mongoose.Schema({
 
prodName:{required:true,type:string},
price:{required:true,type:float64Array},
description:{required:true,type:string},
picture1:{required:true,type:{
		data: buffer,
		contentType: string}
},
picture2:{required:true,type:{
    data: buffer,
    contentType: string}
},
picture3:{required:true,type:{
    data: buffer,
    contentType: string}
},
stock:{required:true,type:int},
prodId:{required:true,type:int}
})



const model= mongoose.model("Product",ProductSchema)
model.exports=model;

