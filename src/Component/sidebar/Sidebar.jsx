import React, { useContext, useState } from "react";
import Dashboard from "@mui/icons-material/Dashboard";
import Inventory from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ProfileIcon from "@mui/icons-material/ContactPage";
import LogoutIcon from "@mui/icons-material/MeetingRoom";
import HamburgerIcon from "@mui/icons-material/Menu";

import style from "./sidebar.module.scss";
import ecomLogo from "../../Images/Logo.png";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

function Sidebar() {
  const history = useNavigate();
  const auth = useContext(AuthContext);

  const {
    sidebarMain,
    sidebarLogo,
    menuItem,
    menus,
    header,
    hamburgerToggle,
    activeMenu,
    hidden,
    collapsed,
  } = style;
  const [isHamburgerActive, setisHamburgetActive] = useState(false);
  const [sidebarMenus, setSidebarMenu] = useState([
    {
      id: 1,
      name: "Dashboard",
      route: "/dashboard",
      icon: <Dashboard />,
    },
    {
      id: 2,
      name: "Product Hunter",
      route: "/blackbox",
      icon: <Inventory />,
    },
    {
      id: 3,
      name: "Product Suppliers",
      route: "/suppliers",
      icon: <LocalShippingIcon />,
    },
    {
      id: 4,
      name: "Profile",
      route: "/profile",
      icon: <ProfileIcon />,
    },
    {
      id: 5,
      name: "Logout",
      route: "/logout",
      icon: <LogoutIcon />,
    },
  ]);
  function navigateTo(route) {
    history(`/${route}`);
  }

  function logoutPressed() {
    auth.logout();
  }

  function toggleDrawer() {
    setisHamburgetActive(!isHamburgerActive);
  }

  function MenuItemDesign(element) {
    element.isActive = element.route === window.location.pathname;
    if (element.id === 5) {
      return (
        <div
          className={element.isActive ? `${menuItem} ${activeMenu}` : menuItem}
          onClick={() => {
            logoutPressed();
          }}
        >
          <i>{element.icon}</i>
          <p className={isHamburgerActive ? hidden : ""}>{element.name}</p>
        </div>
      );
    }
    return (
      <div className={element.isActive ? `${menuItem} ${activeMenu}` : menuItem}>
        <i>{element.icon}</i>
        <p className={isHamburgerActive ? hidden : ""}>{element.name}</p>
      </div>
    );
  }

  return (
    <>
      <div
        className={isHamburgerActive ? `${sidebarMain} ${collapsed}` : sidebarMain}
      >
        <div className={header}>
          {isHamburgerActive ? <div style={{ marginTop: "75px" }}></div> : null}
          <i className={hamburgerToggle} onClick={() => toggleDrawer()}>
            <HamburgerIcon />
          </i>

          <img
            src={ecomLogo}
            className={isHamburgerActive ? `${sidebarLogo} ${hidden}` : sidebarLogo}
            alt="EcomBuddy Logo"
            onClick={() => {
              navigateTo("");
            }}
          />
        </div>

        <div className={menus}>
          {sidebarMenus.map((element, index) => (
            <NavLink key={index} to={element.route}>
              {MenuItemDesign(element)}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
