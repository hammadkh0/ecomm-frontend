import * as React from "react";

import Box from "@mui/material/Box";

import CustomDrawer, {
  DrawerHeader,
} from "../../Component/Admin/Drawer/CustomDrawer";
import { Outlet } from "react-router-dom";

const Admin = (props) => {
  return (
    <Box sx={{ display: "flex", backgroundColor: "#F8FAFC", height: "100svh" }}>
      <CustomDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Admin;
