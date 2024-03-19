const Product = require("./ProductsModel")

const createProduct = async ({prodName:prodName,price:price,description:description,picture1:picture1,picture2:picture2,picture3:picture3,stock:stock}) => {
    try
    {
       var prod=await Product.find().sort({prodId:-1}).limit(1).exec()
      
 console.log('prod_id:'+prod.length);
     if(prod.length===0)
       prod_id=1
     else
      prod_id=prod[0].prodId+1
   
    
        const newProduct = new Product({prodName:prodName,price:price,description:description,picture1:picture1,picture2:picture2,picture3:picture3,stock:stock,prodId:prod_id})
        console.log(newProduct)
         await newProduct.save()  
         console.log("Product Created")
        return newProduct
    }
    catch(e)
    {   console.log("fail to create Product"+e)
        return null
    }
}


const GetProductByName = async (prodName) => {
   try{
  const products= await Product.find({prodName:prodName})
  if (products.length>0)
   return products
  else
   return null
   }
   catch
   {   console.log("fail to GetProductByName")
       return null
   }
}


const deleteProduct = async (id) => {
    try
    {
        await Product.findByIdAndDelete(id)
        console.log("delete")
        return 1
    }
    catch
    {   console.log("fail to deleteProduct")
        return 0
    }
}

const GetAllProduct = async () => {
    try
    {
        const products= await Product.find()
console.log(products)
        if (products.length>0)
          return products
        else
          return null
    }
    catch
    {   console.log("fail to GetAllProduct")
        return null
    }
}
const GetProductByID = async (prodid) => {
    try
    {
        const product= await Product.find({prodId:prodid})

        if (product.length>0)
          return product
        else
          return null
    }
    catch
    {   
        console.log("fail to GetProductByID")
        return null
    }

}
module.exports = { GetProductByName, createProduct, deleteProduct,GetProductByID,GetAllProduct }