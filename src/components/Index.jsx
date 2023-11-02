import React, { useEffect } from "react";
import Home from "./Home.jsx";
import AddProduct from "./AddProduct.jsx";
import Cart from "./Cart.jsx";
import ProductDetails from "./ProductDetails.jsx";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAllProductsThunk } from "../redux/reducers/Product";

const Index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProductsThunk());
  }, []);
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/add" element={<AddProduct />}></Route>
        <Route exact path="/cart" element={<Cart />}></Route>
        <Route path="/details/:id" element={<ProductDetails />}></Route>
      </Routes>
    </>
  );
};
export default Index;
