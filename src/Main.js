import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./page/Login.jsx";
import Register from "./page/Register.jsx";
import Index from "./components/Index.jsx";

const Main = () => {
  const isLoggedIn = useSelector((state) => state.userReducer.authToken);
  const isLoading = useSelector((state) => state.userReducer.isLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/");
    else navigate("/login");
  }, [isLoggedIn]);
  if (isLoading) return <div className="text-center">Loading....</div>;
  return (
    <>
      {isLoggedIn ? (
        <Index />
      ) : (
        <Routes>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
        </Routes>
      )}
    </>
  );
};
export default Main;
