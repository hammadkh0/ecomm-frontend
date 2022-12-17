import * as React from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    field: "image",
    id: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      const link = params.row.image;
      return (
        <img style={{ width: 40, height: 40 }} src={link} alt={params.value.asin} />
      );
    },
  },
  { field: "title", id: "title", headerName: "Title", width: 200 },
  { field: "asin", id: "asin", headerName: "ASIN", minWidth: 150, width: 150 },
  {
    field: "category",
    id: "category",
    headerName: "Category",
    minWidth: 200,
    align: "right",
  },
  {
    field: "rating",
    id: "rating",
    headerName: "Rating",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

export default function StickyHeadTable(props) {
  const history = useNavigate();
  const rows = props.products;

  const handleRowClick = (params) => {
    console.log(params);
    history(`/blackbox/products/${params.row.asin}}`, {
      state: { asin: params.row.asin, domain: props.domain },
    });
  };
  return (
    <Paper sx={{ width: "70vw", height: 460 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        onRowClick={handleRowClick}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Paper>
  );
}