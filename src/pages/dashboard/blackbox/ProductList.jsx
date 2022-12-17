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

  const search_term = state.search_term.split(" ").join("+");

  React.useEffect(() => {
    axios
      .get(
        `https://api.rainforestapi.com/request?api_key=5CE91649F9134F298BC90D84D6F604E0&type=search&amazon_domain=${state.domain}&search_term=${state.search_term}&max_page=${state.pages}&sort_by=price_low_to_high`
      )
      .then(({ data }) => {
        const searchResults = data.search_results;
        searchResults.map((result) => {
          return (result["id"] = result["position"]);
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
