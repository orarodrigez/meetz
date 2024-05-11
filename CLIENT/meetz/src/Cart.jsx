import { useContext } from 'react'
import { CartContext } from './context/cart'
import Box from '@mui/material/Box';

export default function Cart() {
    const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal,gerQuantity } = useContext(CartContext)

    return (
      <>
      <div className='showcert' >
  <h1 >Cart</h1>
  <div >
    {cartItems.map((item) => (
      <div  key={item.prodId}>
        <div >
          <img src={item.thumbnail} alt={item.title} />
          <div>
            <h1 >{item.prodName}</h1>
            <p >{item.price}</p>
          </div>
        </div>
        <div ><Box display={'flex'}  flexGrow={1} justifyContent={'center'}> 
          <button
             onClick={() => {
              addToCart(item)
            }}
          >
            +
          </button>
          <p>{item.quantity}</p>
          <button
             onClick={() => {
              removeFromCart(item)
            }}
          >
            -
          </button></Box>
          <p >{item.price * item.quantity}</p>
        </div>
      </div>
    ))}
  </div>
  {
    cartItems.length > 0 ? (
      <div >
    <h1 >סה"כ: {getCartTotal()} ש"ח</h1>
    <button
      
      onClick={() => {
        clearCart()
      }}
    >
      Clear cart
    </button>
  </div>
    ) : (
      <h1 >Your cart is empty</h1>
    )
  }
</div>
      </>
    )
  }