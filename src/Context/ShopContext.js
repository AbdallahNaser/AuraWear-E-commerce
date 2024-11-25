import { useEffect, useState, createContext, useContext } from "react";

// Create a Shop Context
export const ShopContext = createContext(null);

export const useShopContext = () => useContext(ShopContext);

const Products = (props) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

  // Fetch all products and initialize the cart
  const getAllProducts = () => {
    fetch("http://localhost:9000/Products")
    .then((res) => res.json())
    .then((data) => {
      setProducts(data);
      // Initialize cart items with 0 for each product
      const cart = {};
      data.forEach((product) => {
        cart[product.id] = 0;
      });
      setCartItems(cart);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
  
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  

  // Add item to cart
  const addToCart = (productId) => {
    setCartItems((prev) => ({
      ...prev,
      [productId]: prev[productId] + 1,
    }));
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems((prev) => ({
      ...prev,
      [productId]: prev[productId] > 0 ? prev[productId] - 1 : 0,
    }));
  };



  const getTotalCartAmount = () => {
    if (!products.length) {
      console.warn("Products are not loaded yet.");
      return 0;
    }
  
    return Object.entries(cartItems).reduce((total, [productId, count]) => {
      const product = products.find((p) => String(p.id) === productId); // Use String to match object keys
      if (product) {
        return total + product.new_price * count;
      }
      return total;
    }, 0);
  };
  


  // Calculate total number of items in the cart
  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((total, count) => total + count, 0);
  };

  // Shop context value
  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartItems,
    getTotalCartAmount,
    products,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default Products;