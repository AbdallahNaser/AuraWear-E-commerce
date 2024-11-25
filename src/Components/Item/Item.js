import { Link } from 'react-router-dom';
import './item.css';
import { ShopContext } from "../../Context/ShopContext";
import { useContext } from 'react';

function Item(props){
    const {addToCart}=useContext(ShopContext);

    return(
        <div className="item">
           <Link to={`/product/${props.id}`}> <img  src={props.image} alt=""/></Link>
            <p>{props.name}</p>
            <div className="item-prices">
                <div className="item-price-new">
                    ${props.new_price}
                </div>
                <div className="item-price-old">
                   ${props.old_price}
                </div>
            </div>
            <button onClick={()=>{addToCart(props.id)}} className='add-to-cart-btn'>ADD TO CART</button>

        </div>
    )
}
export default Item;