import { useState } from "react";
import { useNavigate } from "react-router-dom";
function AddProducts() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [new_price, setNewPrice] = useState(0);
    const [old_price, setOldPrice] = useState(0);

    let navigate=useNavigate();
    const formSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:9000/Products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                category,
                image,
                new_price:parseFloat(new_price),
                old_price:parseFloat(old_price),
                
            })
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to add product");
            }
            return res.json();
        })
        .then((data) => {
            console.log("Product added successfully:", data);
            navigate('/');
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    };

    return (
        <>
            <h1>Add Product</h1>

            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '500px' }}>
                <h3 className="text-center mb-4">Add Product</h3>
                <form onSubmit={formSubmit}>
                    <div className="mb-3">
                        <label htmlFor="productTitle" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="productTitle"
                            placeholder="Product Name"
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
                            placeholder="Product Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productImage" className="form-label">
                            Image
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            id="productImage"
                            placeholder="Product Image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productNewPrice" className="form-label">
                            New Price
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="productNewPrice"
                            placeholder="New Price"
                            value={new_price}
                            onChange={(e) => setNewPrice(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productOldPrice" className="form-label">
                            Old Price
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="productOldPrice"
                            placeholder="Old Price"
                            value={old_price}
                            onChange={(e) => setOldPrice(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Add Product
                    </button>
                </form>
            </div>
        </div>
        </>
    );
}

export default AddProducts;
