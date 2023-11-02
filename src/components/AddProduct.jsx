import React, { useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch } from "react-redux";
import { addProductThunk } from "../redux/reducers/Product";

function AddProduct() {
  const initialData = {
    title: "",
    price: 0,
    description: "",
    image: "",
    category: "electronics",
  };

  const [formData, setFormData] = useState({ ...initialData });
  const [alert, toggleAlert] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { value } = event.target;
    const inputName = event.target.name;

    if (inputName === "title") setFormData({ ...formData, title: value });
    else if (inputName === "price") setFormData({ ...formData, price: value });
    else if (inputName === "description")
      setFormData({ ...formData, description: value });
    else if (inputName === "image") setFormData({ ...formData, image: value });
    else if (inputName === "category")
      setFormData({ ...formData, category: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form data submitted:", formData);
    dispatch(addProductThunk(formData));
    setFormData({ ...initialData });
    toggleAlert(true);
  };

  return (
    <div style={{ width: "45%", margin: "auto" }}>
      <h4>Add Products</h4>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          placeholder="Enter the title"
          className="form-control"
          value={formData.title}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          type="text"
          name="description"
          placeholder="Describe the product"
          className="form-control"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          name="price"
          placeholder="Enter the price "
          className="form-control"
          value={formData.price}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          name="image"
          placeholder="Provide the image link"
          className="form-control"
          value={formData.image}
          onChange={handleInputChange}
        />
      </div>
      <br></br>
      <div className="form-group">
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        >
          <option value="electronics">electronics</option>
          <option value="mens-clothing">mens-clothing</option>
          <option value="womens-clothing">womens-clothing</option>
          <option value="jewellery">jewellery</option>
        </select>
      </div>
      <br />
      <button onClick={handleSubmit} className="btn btn-info">
        Add Product
      </button>
      {alert && (
        <SweetAlert
          success
          title="Successful"
          onConfirm={() => toggleAlert(false)}
        >
          Product Added
        </SweetAlert>
      )}
    </div>
  );
}

export default AddProduct;
