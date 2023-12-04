const Product = require("./ProductBLL")

const createProduct = async (product) => {
    try
    {
        console.log(product)
        const newProduct = new Product(product)
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


const checkProductExists = async (product) => {
   
  const products= await Product.find({prodName:product.prodName})
  if (products.length>0)
   return products
  else
   return null
}


const deleteProduct = async (id) => {
   
    await Product.findByIdAndDelete(id)
    console.log("delete")
    return "success"
}

const GetAllProduct = async () => {
   
    const products= await Product.find()

    if (products.length>0)
    return products
   else
    return null
}
const GetProductByID = async (prodid) => {
   
    const product= await Product.find({prodId:prodid})

    if (product.length>0)
    return product
   else
    return null
}
module.exports = { checkProductExists, createProduct, deleteProduct,GetProductByID,GetAllProduct }