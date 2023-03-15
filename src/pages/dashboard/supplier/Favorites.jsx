import React, { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../../Component/Tables/table.module.css";
import { AuthContext } from "../../../context/auth-context";
import { refactorData } from "./SuppliersList";
import { ToastContainer } from "react-toastify";
import TransitionsModal from "../../../Component/featureSection/utils/Modal/Modal";
import Style from "./suppliers.module.css";
import { toastError, toastSuccess } from "../../../utils/toast-message";

function Favorites() {
  const { card, mainSubHeading, cardHeader, cardForm, muiTable, wrapper } = Style;
  const { state } = useLocation();
  console.log("🚀 ~ file: Favorites.jsx:16 ~ Favorites ~ state:", state);
  const auth = useContext(AuthContext);

  const [error, setError] = useState();
  const [rows, setRows] = useState(state);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    {
      field: "image",
      id: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => {
        const link = params.row.product.image;
        return <img style={{ width: 80, height: 80 }} src={link} alt="Product" />;
      },
    },
    {
      field: "title",
      id: "title",
      headerName: "Title",
      width: 270,
      renderCell: (params) => {
        const title = params.row.product.title;
        return <p>{title}</p>;
      },
    },
    {
      field: "min_order",
      id: "min_order",
      headerName: "Min. Order",
      width: 100,
      renderCell: (params) => {
        const min_order = params.row.product.min_order;
        return <p style={{ paddingLeft: 10 }}>{min_order}</p>;
      },
    },
    {
      field: "price_range",
      id: "price_range",
      headerName: "Price Range",
      width: 150,
      renderCell: (params) => {
        const price_range = params.row.product.price_range;
        return <p>{price_range}</p>;
      },
    },
    {
      field: "view_product",
      id: "view_product",
      headerName: "View Product",
      width: 170,
      renderCell: (params) => {
        const product_link = params.row.product.link;
        return <button className={styles.productBtn}>View Product Details</button>;
      },
    },
    {
      field: "name",
      id: "name",
      headerName: "Supplier Name",
      width: 130,
      renderCell: (params) => {
        const name = params.row.supplier.name;
        return <p>{name}</p>;
      },
    },
    {
      field: "isVerified",
      id: "isVerified",
      headerName: "Verified Supplier",
      width: 130,
      renderCell: (params) => {
        const isVerified = params.row.supplier.isVerified;
        return (
          <p style={{ margin: "auto" }}>{isVerified === true ? "TRUE" : "FALSE"}</p>
        );
      },
    },
    {
      field: "level",
      id: "level",
      headerName: "Supplier Level",
      width: 110,
      renderCell: (params) => {
        const level = params.row.supplier.level;
        return <p style={{ margin: "auto" }}>Level: {level}</p>;
      },
    },
    {
      field: "rating",
      id: "rating",
      headerName: "Supplier Rating",
      width: 115,
      renderCell: (params) => {
        const rating = params.row.supplier.rating;
        return <p style={{ margin: "auto" }}>{rating || 0} stars</p>;
      },
    },
    {
      field: "prev_orders",
      id: "prev_orders",
      headerName: "Previous Order Volumes",
      width: 170,
      renderCell: (params) => {
        const prev_orders = params.row.supplier.prev_orders;
        return <p style={{ margin: "auto" }}>{prev_orders}</p>;
      },
    },
    {
      field: "view_supplier",
      id: "view_supplier",
      headerName: "View Supplier",
      width: 170,
      renderCell: (params) => {
        const supplier_link = params.row.supplier.link;
        return <button className={styles.supplierBtn}>View Supplier Details</button>;
      },
    },
    {
      field: "add_favorites",
      id: "add_favorites",
      headerName: "Add to Favorites",
      width: 170,
      renderCell: (params) => {
        return (
          <button
            className={styles.favBtn2}
            onClick={(e) => {
              removeFavorites(e, params.row);
            }}
          >
            Remove from Favorites
          </button>
        );
      },
    },
  ];

  function handleSupplierDetails() {}

  function removeFavorites(e, prod) {
    e.preventDefault();
    console.log(prod);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/ecomm/suppliers/${prod._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const newData = refactorData(data.data.suppliers);
        setRows(newData);
        toastSuccess("Removed from favorites");
      })
      .catch((err) => {
        toastError("Error removing from favorites");
      });
  }

  return (
    <div className={wrapper}>
      <div className={card}>
        <div className={cardHeader}>
          <h2 className={mainSubHeading}>Favorite Suppliers across Alibaba</h2>
          <p>Select a supplier to see furthur details</p>
        </div>
      </div>
      {error && <p>{error}</p>}
      <div className={muiTable}>
        {rows.length !== 0 && (
          <Paper sx={{ width: "100%", height: 500 }}>
            <ToastContainer />
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
            />
          </Paper>
        )}
      </div>

      <TransitionsModal
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
    </div>
  );
}

export default Favorites;
