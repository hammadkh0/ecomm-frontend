import React, { useState } from "react";
import ProductStyle from "./productstyle.module.css";
import Navbar from "../../../Component/navbar/Navbar";
import Rating from "@mui/material/Rating";
import { useLocation } from "react-router-dom";

import axios from "axios";
import StickyHeadTable from "../../../Component/MUI/MuiTable";

function ProductList() {
  const [products, setProducts] = useState("");

  const { state } = useLocation();

  // const search_term = state.search_term.split(" ").join("+");
  const search_term = state.search_term;
  //const domain = state.domain;
  // const max_page = state.pages;
  React.useEffect(() => {
    fetch(`${import.meta.env.VITE_FLASK_URL}/ecomm/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        url: `https://amazon.com`,
        input_term: search_term,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // const searchResults = data.search_results;
        const searchResults = data.products;
        console.log("🚀 ~ file: ProductList.jsx:38 ~ .then ~ data", data);
        searchResults.map((result) => {
          // return (result["id"] = result["position"]);
          return (result["id"] = result["asin"]);
        });
        setProducts(searchResults);
      });
  }, [search_term]); // <-- Have to pass in [] here!

  return (
    <>
      <div className={ProductStyle.wrapper}>
        <div className={ProductStyle.filterHeader}>
          <h1>Filters selection</h1>
          <p>
            Given below the filters can be applied to find out product which suits
            best as per criteria
          </p>
        </div>

        {products.length && (
          <StickyHeadTable products={products} domain={state.domain} />
        )}
      </div>
    </>
  );
}

export default ProductList;
