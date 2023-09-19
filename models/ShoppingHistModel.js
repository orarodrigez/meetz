const mongoose=require("mongoose")

const ShoppingHistSchema=mongoose.Schema({
 
    receit_no:{required:true,type:string},
    prod_id:{required:true,type:int},
    prod_price:{required:true,type:double},
    user_id:{required:true,type:int}
})
const model= mongoose.model("ShoppingHist",ShoppingHistSchema)
model.exports=model;