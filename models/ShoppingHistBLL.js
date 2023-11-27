const ShoppingHist = require("./ShoppingHist")

const createShoppingHist = async (Shopping) => {
    try
    {
        console.log(Shopping)
        const newShoppingHist = new ShoppingHist(Shopping)
        console.log(newShoppingHist)
         await newShoppingHist.save()  
         console.log("ShoppingHist Created")
        return newShoppingHist
    }
    catch
    {   console.log("fail to create ShoppingHist")
        return null
    }
}


const checkShoppingHistExists = async (Shopping) => {
   
  const ShoppingHist= await ShoppingHist.find({prodName:Shopping.prodName})
  if (ShoppingHist.length>0)
   return ShoppingHist
  else
   return null
}



const GetAllshoppingHistById = async (shopping_Id ) => {
   
    const shoppingHists= await ShoppingHist.find({shopping_Id:shopping_Id})

    if (shoppingHists.length>0)
    return shoppingHists
   else
    return null
}

module.exports = { checkShoppingHistExists, createShoppingHist, GetAllshoppingHistById }