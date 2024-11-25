import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Product.css";

function AddProduct() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null); // File input state for image
  const [newPrice, setNewPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);

  const navigate = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object to send the image file
    const formData = new FormData();
    formData.append("image", image); // Append the image file

    // Upload the image first
    fetch("http://localhost:9000/upload-image", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // After the image is uploaded, send the product details to json-server
        const productData = {
          name,
          category,
          image: `/images/${data.filename}`, // Store image path
          new_price: parseFloat(newPrice),
          old_price: parseFloat(oldPrice),
        };

        return fetch("http://localhost:9000/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        });
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("Product added successfully:", data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={formSubmit} className="product-form">
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="productName"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productCategory" className="form-label">
            Category
          </label>
          <input
            type="text"
            className="form-control"
            id="productCategory"
            placeholder="Product category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productImage" className="form-label">
            Product Image
          </label>
          <input
            type="file"
            className="form-control"
            id="productImage"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPrice" className="form-label">
            New Price
          </label>
          <input
            type="number"
            className="form-control"
            id="newPrice"
            placeholder="New price"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="oldPrice" className="form-label">
            Old Price
          </label>
          <input
            type="number"
            className="form-control"
            id="oldPrice"
            placeholder="Old price"
            value={oldPrice}
            onChange={(e) => setOldPrice(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary addbtn">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
