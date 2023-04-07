import React, { useContext } from "react";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Typography from "@mui/material/Typography";

import styles from "./adminsidebar.module.css";
import { AuthContext } from "../../../context/auth-context";
import { useNavigate } from "react-router-dom";

const AdminSidebar = ({ open }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  function logoutPressed() {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/ecomm/users/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        auth.logout();
        navigate("/login");
      });
  }
  return (
    <>
      <List>
        {["View All Users", "View All Admins", "Send email", "Drafts", "Logout"].map(
          (text, index) => {
            return (
              <ListItem
                key={text}
                disablePadding
                sx={{ display: "block" }}
                onClick={
                  text === "Logout"
                    ? () => {
                        logoutPressed();
                      }
                    : null
                }
              >
                <ListItemButton
                  className={styles.sidebarItem}
                  sx={{
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      // color: "white",
                    }}
                  >
                    {index % 2 === 0 ? (
                      <InboxIcon
                        className={styles.sidebarIcon}
                        sx={{
                          fontSize: "30px",
                        }}
                      />
                    ) : (
                      <MailIcon
                        className={styles.sidebarIcon}
                        sx={{
                          fontSize: "30px",
                        }}
                      />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        // variant="body1"
                        className={styles.sidebarText}
                        sx={{
                          opacity: open ? 1 : 0,
                        }}
                      >
                        {text}
                      </Typography>
                    }
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            );
          }
        )}
      </List>
    </>
  );
};

export default AdminSidebar;
