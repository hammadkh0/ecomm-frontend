import * as React from "react";

import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material";

import { theme } from "../../themes/theme";
import CustomDrawer, {
  DrawerHeader,
} from "../../Component/Admin/Drawer/CustomDrawer";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../Component/Admin/Sidebar/AdminSidebar";

const Admin = (props) => {
  return (
    <Box sx={{ display: "flex", backgroundColor: "#F8FAFC", height: "100svh" }}>
      <CustomDrawer Sidebar={AdminSidebar} userType="Admin" />
      <ThemeProvider theme={theme}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Outlet />
        </Box>
      </ThemeProvider>
    </Box>
  );
};

export default Admin;
