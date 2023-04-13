import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

// mui
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Avatar, Button } from "@mui/material";
import { LogoutOutlined } from "@mui/icons-material";

// custom
import stringAvatar from "../../utils/generate-color";
import Logo from "../../Images/Logo.png";
import styles from "./Navbar.module.css";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Navbar = (props) => {
  const auth = useContext(AuthContext);
  const history = useNavigate();

  function navigateTo(route) {
    history(`/${route}`);
  }

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar
          sx={{
            background: "#fff",
          }}
        >
          <Toolbar>
            <div className={styles.navbarContainer}>
              <div className={styles.navbar}>
                <div className={styles.logoLinksContainer}>
                  <div className={styles.logo}>
                    <img src={Logo} alt="logo" className={styles.navbarLogo} />
                  </div>
                  {auth.token && (
                    <>
                      <div className={styles.desktopNavbarLinks}>
                        <ul>
                          <li>
                            <p onClick={() => navigateTo("dashboard")}>Dashboard</p>
                          </li>
                          <li>
                            <p onClick={() => navigateTo("blackbox")}>Black box</p>
                          </li>
                          <li>
                            <p onClick={() => navigateTo("product")}>
                              Product Listing
                            </p>
                          </li>
                          <li>
                            <p href="#contact_us">Contact Us</p>
                          </li>
                        </ul>
                      </div>

                      <div className={styles.userInfo}>
                        {auth.name && <Avatar {...stringAvatar("" + auth.name)} />}
                        <Button
                          variant="outlined"
                          color="error"
                          endIcon={<LogoutOutlined />}
                          onClick={auth.logout}
                        >
                          Logout
                        </Button>
                      </div>
                    </>
                  )}
                  {!auth.token && (
                    <div className={styles.navbarBtns}>
                      <button
                        className={styles.signupBtn}
                        onClick={() => navigateTo("signup")}
                      >
                        Sign up for free
                      </button>
                      <button
                        className={styles.loginBtn}
                        onClick={() => navigateTo("login")}
                      >
                        Login
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.mobileNavbarLinks}>
                <ul>
                  <li>
                    <p onClick={() => navigateTo("dashboard")}>Dashboard</p>
                  </li>
                  <li>
                    <p onClick={() => navigateTo("blackbox")}>Black box</p>
                  </li>
                  <li>
                    <p onClick={() => navigateTo("product-listing")}>
                      Product Listing
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div style={{ marginBottom: "100px" }}></div>
    </>
  );
};

export default Navbar;
