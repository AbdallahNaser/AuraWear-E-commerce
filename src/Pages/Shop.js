import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import Offers from "../Components/Offers/Offers";
import NewCollections from "../Components/NewCollections/NewCollections";
import NewsLetter from "../Components/NewsLetter/NewsLetter";
import { Link } from "react-router-dom";
import "./CSS/Product.css";

function Shop() {
  return (
    <>
      <Hero />
      <Popular />
      <Offers />
      <NewCollections />
      <div className="addnew">
        <Link to="product/add">
          <button className="addbtn" >Want To Add Product</button>
        </Link>
      </div>
      <NewsLetter />
    </>
  );
}
export default Shop;
