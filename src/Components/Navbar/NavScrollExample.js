import logo from '../Assets/logom.png';
import cart_icon from '../Assets/cart_icon.png';

import './NavbarStyle.css';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

function NavScrollExample() {
  const [menu, setMenu] = useState("shop");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggling the menu visibility

  const { getTotalCartItems } = useContext(ShopContext);

  // Toggle the menu visibility
  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="nav">
      <div className="nav-logo">
        <img src={logo} alt="" />
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="nav-toggle" onClick={handleToggle}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Navigation Menu */}
      <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
        <li onClick={() => { setMenu("shop"); setIsMenuOpen(false); }}>
          <Link style={{ textDecoration: 'none', color: '#292669' }} to='/'>
            Shop
          </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li onClick={() => { setMenu("mens"); setIsMenuOpen(false); }}>
          <Link style={{ textDecoration: 'none', color: '#000000' }} to='/mens'>
            Men
          </Link>
          {menu === "mens" ? <hr /> : <></>}
        </li>
        <li onClick={() => { setMenu("womens"); setIsMenuOpen(false); }}>
          <Link style={{ textDecoration: 'none', color: '#000000' }} to='/womens'>
            Women
          </Link>
          {menu === "womens" ? <hr /> : <></>}
        </li>
        <li onClick={() => { setMenu("kids"); setIsMenuOpen(false); }}>
          <Link style={{ textDecoration: 'none', color: '#000000' }} to='/kids'>
            Kids
          </Link>
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>

      <div className="nav-login-cart">
        <Link style={{ textDecoration: 'none' }} to='/login'>
          <button>Login</button>
        </Link>
        <Link style={{ textDecoration: 'none' }} to='/cart'>
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div> 
      </div>
    </div>
  );
}

export default NavScrollExample;
