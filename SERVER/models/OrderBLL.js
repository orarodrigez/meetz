const Order = require("./OrderModel")

const getOrderId= async()=>
{
    try
    {
        
        var max= Orderfind().sort({order_id:-1}).limit(1)
    
        return max+1;
    }
    catch
    {   console.log("fail to get max")
        return 0;
    }
}
const createOrder = async (order_id,prod_id,price,amount,reciet) => 
{
    try
    {
        var order={order_id:order_id,prod_id:prod_id,price:price,amount:amount,reciet:reciet}
        const newOrder = new Order(order)
        console.log(newOrder)
         await newOrder.save()  
         console.log("order Created")
        return newOrder
    }
    catch
    {   console.log("fail to create newOrder")
        return null
    }
}
const GelAllOrderByUser = async (user_id) => {
        try
        {
            var order =  Order.find({user_id:user_id})
           
            return order
        }
        catch
        {   console.log("fail to get Order")
            return null
        }
}
module.exports = { GelAllOrderByUser, createOrder, getOrderId }