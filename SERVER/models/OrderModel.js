const mongoose=require("mongoose")

const OrderSchema=mongoose.Schema({
 
order_id:{required:true,type:int},
prod_Id:{required:true,type:string},
price:{required:true,type:float},
amount:{required:true,type:int},
reciet:{required:true,type:string}
})



const model= mongoose.model("Order",OrderSchema)
module.exports=model;

