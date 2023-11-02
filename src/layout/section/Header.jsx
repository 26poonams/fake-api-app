import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userLogoutThunk } from "../../redux/reducers/User";

function Header() {
  const isLoggedIn = useSelector((state) => state.userReducer.authToken);

  const dispatch = useDispatch();

  return (
    <header
      style={{
        backgroundColor: "#333",
        color: "#fff",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1>E-Mart</h1>
      {isLoggedIn && (
        <>
          <Link
            to="/"
            className="link-offset-2 link-underline link-underline-opacity-0  h5"
          >
            Products
          </Link>
          <Link
            to="/add"
            className="link-offset-2 link-underline link-underline-opacity-0 h5"
          >
            Add Product
          </Link>
          <Link
            to="/cart"
            className="link-offset-2 link-underline link-underline-opacity-0 h5"
          >
            Cart
          </Link>
          <a
            className="link-offset-2 link-underline link-underline-opacity-0 h5 "
            onClick={() => dispatch(userLogoutThunk())}
          >
            Logout
          </a>
        </>
      )}
    </header>
  );
}

export default Header;
