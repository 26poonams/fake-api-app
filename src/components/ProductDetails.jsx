import React, { useState, useEffect } from "react";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch } from "react-redux";
import { addToCartThunk } from "../redux/reducers/Product";

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [alert, toggleAlert] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf("/") + 1);
    axios.get(`https://fakestoreapi.com/products/${id}`).then((res) => {
      console.log(res);
      setProduct(res.data);
    });
  }, []);

  return (
    <div style={{ margin: "80px" }}>
      {product ? (
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                <h2>{product.title}</h2>
              </div>
              <div className="col-md-12">
                <img
                  src={product.image}
                  alt="product"
                  style={{ width: "80%", height: "60%" }}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                <p className="h5">{product.description}</p>
              </div>
              <div className="col-md-12">
                <h3>{product.category}</h3>
              </div>
              <div className="col-md-12">
                <h3>
                  <strong>Price: ${ product.price }</strong>
                </h3>
              </div>
              <div className="col-md-12">
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => {
                    dispatch(addToCartThunk(product.id));
                    toggleAlert(true);
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {alert && (
        <SweetAlert
          success
          title="Successful"
          onConfirm={() => toggleAlert(false)}
        >
          Added to cart
        </SweetAlert>
      )}
    </div>
  );
}

export default ProductDetails;
