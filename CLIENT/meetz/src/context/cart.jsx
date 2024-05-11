import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()
export const CartProvider = ({ children }) => {

const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])
const getQuantity=()=>
{
  return cartItems.reduce((total, item) => total + item.quantity, 0); // calculate the total  of the items in the cart

};
const addToCart = (item) => {
  
 console.log(cartItems)
    const isItemInCart = cartItems.find((cartItem) => cartItem.prodId === item.prodId); // check if the item is already in the cart
    
  

    if (isItemInCart) {
console.log(item)
    setCartItems(
        cartItems.map((cartItem) => // if the item is already in the cart, increase the quantity of the item
        cartItem.prodId === item.prodId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem // otherwise, return the cart item
        )
    );
    console.log(cartItems)
    } else {
     
    setCartItems([...cartItems, { ...item, quantity: 1 }]); // if the item is not in the cart, add the item to the cart
    }

  };
  const removeFromCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.prodId === item.prodId);
  
    if (isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.prodId !== item.prodId)); // if the quantity of the item is 1, remove the item from the cart
    } else {
        // if the quantity of the item is greater than 1, decrease the quantity of the item
      setCartItems(
        cartItems.map((cartItem) => cartItem.prodId === item.prodId ? { ...cartItem, quantity: cartItem.quantity - 1 }  : cartItem
        )
      );
    }
  };
  const clearCart = () => {
    setCartItems([]); // set the cart items to an empty array
  };
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0); // calculate the total price of the items in the cart
  };
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
    setCartItems(JSON.parse(cartItems));
    }
}, []);
return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        getQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
    }