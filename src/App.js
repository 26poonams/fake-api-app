import React from "react";
import Layout from "./layout/Layout";
import { BrowserRouter } from "react-router-dom";
import Main from "./Main";

function App() {
  return (
    <BrowserRouter>
        <Layout>
          <Main/>
        </Layout>
      </BrowserRouter>
  )
};   

export default App;
