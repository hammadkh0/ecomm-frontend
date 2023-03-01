import React, { useState } from "react";
import ProductStyle from "./productstyle.module.css";
import Rating from "@mui/material/Rating";
import { useLocation } from "react-router-dom";

import StickyHeadTable from "../../../Component/Tables/AmazonTable";

function ProductList() {
  const [products, setProducts] = useState("");

  const { state } = useLocation();

  const search_term = state.search_term;
  // const max_page = state.pages;

  React.useEffect(() => {
    fetch(`${import.meta.env.VITE_FLASK_URL}/ecomm/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        url: `https://${state.domain}`,
        input_term: search_term,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // const searchResults = data.search_results;
        const searchResults = data.products;
        console.log("🚀 ~ file: ProductList.jsx:38 ~ .then ~ data", data);
        searchResults.forEach((result) => {
          // return (result["id"] = result["position"]);
          result["id"] = result["asin"];
          result["categories"] = result["categories"].toString();
        });
        setProducts(searchResults);
      });
  }, []); // <-- Have to pass in [] here!

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
