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
      <div
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <CircularProgress
          size={50}
          sx={{
            fontWeight: "bold",
          }}
        />
        <h2>Logging out...</h2>
      </div>
    </div>
  );
};

export default Logout;
