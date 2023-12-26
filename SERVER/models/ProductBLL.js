const Product = require("./ProductsModel")

const createProduct = async (prodName,price,description,picture1,picture2,picture3,stock) => {
    try
    {
       var prodId=Product.find().sort({prod_id:-1}).limit(1)
        
        const newProduct = new Product({prodName,price,description,picture1,picture2,picture3,stock,prodId})
        console.log(newProduct)
         await newProduct.save()  
         console.log("Product Created")
        return newProduct
    }
    catch
    {   console.log("fail to create Product")
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