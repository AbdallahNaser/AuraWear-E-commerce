import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import "./CSS/Product.css";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";
import new_collection from '../Components/Assets/new_collections'

function Product() {
  const { products } = useContext(ShopContext); // Use products directly from context
  const { productId } = useParams();

  const product = new_collection.find((e) => e.id === Number(productId)); // Find product by ID

  if (!products.length) {
    // While products are being loaded
    return <div>Loading...</div>;
  }

  if (!product) {
    // If product with the given ID is not found
    return <div>Product not found</div>;
  }

  return (
    <div className="product">
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
}

export default Product;
