const CertHist = require("./CertHistModel")



const addCertProduct = async (prod_id,user_id,amount) => {
    try
    {
     if (GetCertProductAmount(product,user_id)>0)
        {
            CertHist.Update({prod_id:prod_id,user_id:user_id},{
                $set: {
                  amount: amount+1
                },
                $currentDate: { lastUpdated: true }
              })
           
             console.log("CertHist updated")
            return CertHist
        }
     else
     {
         var cert={}
         console.log(cert)
         const newCertHist = new CertHist(Shopping)
         console.log(newCertHist)
         await newCertHist.save()  
         console.log("newCertHist Created")
     }
     return newCertHist
 }
 catch
 {   console.log("fail to add product to cert")
     return null
 }
}



const DeleteCertProduct = async (product,user_id,amount) => {
    try
    {   
            var prod=CertHist.find({prod_id:prod_id,user_id:user_id})
            CertHist.findByIdAndDelete(prod._id)
             console.log("Cert Product deleted")
            return true;
                 
    }
    catch
    {   console.log("fail to delete product in cert")
        return false;
    }
}

const GetCertProductAmount = async (prod_id,user_id) => {
    try
    {
        
         const amount=await CertHist.find({prod_id:prod_id,user_id:user_id})  
         return amount
    }
    catch
    {   console.log("fail to find CertProductAmount "+prod_id)
        return 0
    }
}



const GetAllCertByUserId = async (user_id ) => {
   try
   {
        const certHists= await CertHist.find({user_id:user_id})

    if (certHists.length>0)
        return certHists
    else
        return null
   }
    catch
    {   console.log("fail to find AllCertByUserId  "+user_id)
        return 0
    }

}

module.exports = {  GetAllCertByUserId, addCertProduct,DeleteCertProduct,GetCertProductAmount }