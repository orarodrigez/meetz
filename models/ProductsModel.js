const mongoose=require("mongoose")

const ProductSchema=mongoose.Schema({
 
prod_name:{required:true,type:string},
price:{required:true,type:string},
description:{required:true,type:string},
picture:{required:true,type:string},
stock:{required:true,type:int},
prod_id:{required:true,type:int}
})

const getAllusers=async()=>{
    const users= await this.find({})
}

const model= mongoose.model("Product",ProductSchema)
model.exports=model,{getAllusers};

