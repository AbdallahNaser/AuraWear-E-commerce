import { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

function ShopCategory(props) {
    // Extract products from ShopContext
    const { products } = useContext(ShopContext);

    // Handle loading state if products are not available yet
    if (!products || products.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className='shop-category'>
            <img className='shopcategory-banner' src={props.banner} alt="" />
            <div className='shopcategory-indexSort'>
                <p>
                    <span>Showing 1-12</span> out of {products.length} products
                </p>
                <div className='shopcategory-sort'>
                    Sort by <img src={dropdown_icon} alt="" />
                </div>
            </div>
            <div className="shopcategory-products">
                {products.map((item) => {
                    if (props.category === item.category) {
                        return (
                            <Item
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                image={`/images/${item.image}`}  // Adjusted to the public path
                                new_price={item.new_price}
                                old_price={item.old_price}
                            />
                        );
                    }
                    return null;
                })}
            </div>
            <div className='shopcategory-loadmore'>
                Load More
            </div>
        </div>
    );
}

export default ShopCategory;
