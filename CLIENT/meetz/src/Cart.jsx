import { useContext } from 'react'
import { CartContext } from './context/cart'
export default function Cart() {
    const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext)

    return (
      <>
      <div >
  <h1 >Cart</h1>
  <div >
    {cartItems.map((item) => (
      <div  key={item.id}>
        <div >
          <img src={item.thumbnail} alt={item.title} />
          <div>
            <h1 >{item.title}</h1>
            <p >{item.price}</p>
          </div>
        </div>
        <div >
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
          </button>
        </div>
      </div>
    ))}
  </div>
  {
    cartItems.length > 0 ? (
      <div >
    <h1 >Total: ${getCartTotal()}</h1>
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