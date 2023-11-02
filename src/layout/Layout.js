import React from "react";
import Header from "./section/Header.jsx";
import Footer from "./section/Footer.jsx";

function Layout(props) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}

export default Layout;
