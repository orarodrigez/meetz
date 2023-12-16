const mongoose=require("mongoose")

const CertHistSchema=mongoose.Schema({
 
    prod_id:{required:true,type:int},   
    user_id:{required:true,type:int},
    amount:{required:true,type:int},
})
const model= mongoose.model("certHist",CertHistSchema)
model.exports=model;