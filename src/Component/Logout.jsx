import React from "react";
import { CircularProgress } from "@mui/material";
const Logout = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100svh",
      }}
    >
      <div>
        <CircularProgress sx={{ fontWeight: "bold", fontSize: "24px" }} />
        <h3>Logging out......</h3>
      </div>
    </div>
  );
};

export default Logout;
