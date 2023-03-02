import React, { useState } from "react";
import Style from "./suppliers.module.css";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import AlibabaTable from "../../../Component/Tables/AlibabaTable";

function SuppliersList() {
  const { card, mainSubHeading, cardHeader, cardForm, muiTable, wrapper } = Style;

  const [search, setSearch] = useState("");
  const [maxPage, setMaxPage] = useState(1);
  const [products, setProducts] = useState([]);

  function findSuppliers(e) {
    e.preventDefault();
    var data = {
      input_term: search,
      pages: maxPage || 1,
    };
    fetch(`${import.meta.env.VITE_FLASK_URL}/ecomm/suppliers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Origin": import.meta.env.VITE_FLASK_URL,
      },
      mode: "cors",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("🚀 ~ file: Supplier.jsx:52 ~ .then ~ data", data);
        setProducts(data.results);
      });

    setSearch("");
  }
  return (
    <div className={wrapper}>
      <div className={card}>
        <div className={cardHeader}>
          <h2 className={mainSubHeading}>Find suppliers on Alibaba</h2>
          <p>Enter the keywords to find the suppliers for the products</p>
        </div>
        <form className={cardForm} onSubmit={(e) => {}}>
          <TextField
            label="Search Term"
            id="outlined-size-small"
            size="small"
            name="search_term"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <TextField
            label="Max Pages"
            id="outlined-size-small"
            size="small"
            name="pages"
            value={maxPage}
            onChange={(e) => setMaxPage(e.target.value)}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />

          <div>
            <Button
              variant="contained"
              type="submit"
              disabled={search === ""}
              onClick={findSuppliers}
            >
              Search Products
            </Button>
          </div>
        </form>
      </div>
      <div className={muiTable}>
        {products.length !== 0 && <AlibabaTable products={products} />}
      </div>
    </div>
  );
}

export default SuppliersList;
