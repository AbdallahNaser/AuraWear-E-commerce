import { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

function CartItems() {
  const { products, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);

  if (!products || Object.keys(cartItems).length === 0) {
    return <div>Your cart is empty.</div>;
  }


  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {products.map((product) => {
        if (cartItems[product.id] > 0) {
          return (
            <div
              className="cartitems-format cartitems-format-main"
              key={product.id}
            >
              <img
                src={`/images/${product.image}`}
                alt={product.name}
                className="carticon-product-icon"
              />
              <p>{product.name}</p>
              <p>${product.new_price}</p>
              <button className="cartitems-quantity">
                {cartItems[product.id]}
              </button>
              <p>${product.new_price * cartItems[product.id]}</p>
              <img
                className="cartitems-remove-icon"
                onClick={() => {
                  removeFromCart(product.id);
                }}
                src={remove_icon}
                alt="Remove item"
              />
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping fee</p>
              <p>Free</p>
            </div>
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItems;