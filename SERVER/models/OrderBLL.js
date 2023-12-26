const Order = require("./OrderModel")


const insertNewOrder = async (order_id,prod_id,price,amount,reciet) => 
{
    try
    {
        if (order_id==0)
          order_id=Order.find().sort({order_id:-1}).limit(1)+1;
        var order={order_id:order_id,prod_id:prod_id,price:price,amount:amount,reciet:reciet}
        const newOrder = new Order(order)
        console.log(newOrder)
         await newOrder.save()  
         console.log("order Created")
        return order_id;
    }
    catch
    {   console.log("fail to create newOrder")
        return 0
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
module.exports = { GelAllOrderByUser, insertNewOrder }