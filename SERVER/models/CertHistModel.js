const mongoose=require("mongoose")

const CertHistSchema=mongoose.Schema({
 
    prod_id:{required:true,type:Number},   
    user_id:{required:true,type:Number},
    amount:{required:true,type:Number},
})
const model= mongoose.model("certHist",CertHistSchema)
model.exports=model;