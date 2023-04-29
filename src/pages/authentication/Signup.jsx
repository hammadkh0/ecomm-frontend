/* eslint-disable no-undef */
import React, { useContext, useEffect, useState } from "react";
import SignupStyle from "./signupstyle.module.css";
import Img3 from "../../Images/Signup_image.png";
import EcomBuddyLogo from "../../Images/Logo.png";

import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { Link, useNavigate } from "react-router-dom";
import {
  AlternateEmail,
  FacebookTwoTone,
  Google,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useHttpClient } from "../../hooks/http-hook";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { toastError, toastSuccess } from "../../utils/toast-message";
import jwtDecode from "jwt-decode";
import { AuthContext } from "../../context/auth-context";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { IconButton, InputAdornment, InputLabel } from "@mui/material";
import TextInput from "../../Component/Inputs/TextInput";

export default function Signup() {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const [showPassword, setShowPassword] = useState("password");
  const [showConfirmPassword, setShowConfirmPassword] = useState("password");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { sendRequest } = useHttpClient();

  // --------------------------- INPUT FUNTIONS ---------------------------
  useEffect(() => {
    // cleanup function
    return () => {
      setShowPassword("password");
      setShowConfirmPassword("password");
    };
  }, []);

  const passwordDisplay = () => {
    showPassword === "text" ? setShowPassword("password") : setShowPassword("text");
  };

  const confirmPasswordDisplay = () => {
    showConfirmPassword === "text"
      ? setShowConfirmPassword("password")
      : setShowConfirmPassword("text");
  };

  // --------------------------- AUTH FUNCTIONS ---------------------------
  const responseFacebook = (response) => {
    console.log(response);
  };

  const googleLoginSuccess = async (data) => {
    //console.log(data.credential);
    const profile = jwtDecode(data.credential);

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/ecomm/users/auth/google`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Origin": import.meta.env.VITE_BACKEND_URL,
        },
        mode: "cors",
        body: JSON.stringify({
          user: {
            credential: profile,
          },
        }),
      }
    );

    const res = await response.json();
    const user = res.data.user;

    toastSuccess("Signed in successfully");
    setTimeout(() => {
      auth.login(user._id, user.role, res.token, user.name);
      user.role === "user" ? navigate("/dashboard") : navigate("/admin/dashboard");
    }, 1500);
  };

  const authSubmitHandler = async (formData) => {
    try {
      console.log(inputs);
      const responseData = await sendRequest(
        `${import.meta.env.VITE_BACKEND_URL}/ecomm/users/signup`,
        "POST",
        JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          passwordConfirm: formData.passwordConfirm,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      const user = responseData.data.user;

      toastSuccess("Signed in successfully");
      setTimeout(() => {
        auth.login(user._id, user.role, responseData.token, user.name);
        user.role === "user" ? navigate("/dashboard") : navigate("/admin/dashboard");
      }, 1500);
      // navigate("/dashboard");
    } catch (error) {
      toastError("Something went wrong");
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <section className={SignupStyle.main_section}>
        <div className={SignupStyle.section1}>
          <div className={SignupStyle.top_image}>
            <img src={EcomBuddyLogo} alt="" />
          </div>
          <h2 className={SignupStyle.loginheading}>Sign Up to EcomBuddy</h2>

          <div className={SignupStyle.main_form}>
            <form onSubmit={handleSubmit(authSubmitHandler)}>
              <div className={SignupStyle.logintextfield}>
                {/* ---------------- USER NAME ----------------- */}
                <div
                  className={[SignupStyle.entername, SignupStyle.formInput].join(
                    " "
                  )}
                >
                  <InputLabel
                    htmlFor="name"
                    variant="standard"
                    required
                    sx={{
                      mb: 1.5,
                      color: "text.primary",
                      "& span": { color: "error.light" },
                      fontSize: "label.fontSize",
                    }}
                  >
                    Enter Your Name
                  </InputLabel>
                  <TextInput
                    control={control}
                    required
                    maxLength={30}
                    name="name"
                    placeholder="John Doe"
                    id="name"
                    fullWidth
                    autoComplete="family-name"
                    error={errors.name ? true : false}
                    helperText={errors.name && "Name is required"}
                  />
                </div>

                {/* ------------------- EMAIL ------------------  */}
                <div
                  className={[SignupStyle.loginemail, SignupStyle.formInput].join(
                    " "
                  )}
                >
                  <InputLabel
                    htmlFor="email"
                    variant="standard"
                    sx={{
                      mb: 1.5,
                      color: "text.primary",
                      "& span": { color: "error.light" },
                      fontSize: "label.fontSize",
                    }}
                  >
                    Enter your Email
                  </InputLabel>
                  <TextInput
                    control={control}
                    required={true}
                    pattern={/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/}
                    name="email"
                    id="email"
                    placeholder="johndoe@gmail.com"
                    fullWidth
                    autoComplete="email"
                    error={errors.email ? true : false}
                    helperText={errors.email && "Invalid email address"}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AlternateEmail />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                {/* ------------------- PASSWORD ------------------  */}
                <div
                  className={[SignupStyle.loginpassword, SignupStyle.formInput].join(
                    " "
                  )}
                >
                  <InputLabel
                    htmlFor="password"
                    variant="standard"
                    required
                    sx={{
                      mb: 1.5,
                      color: "text.primary",
                      "& span": { color: "error.light" },
                      fontSize: "label.fontSize",
                    }}
                  >
                    Enter your Password
                  </InputLabel>

                  <TextInput
                    control={control}
                    required
                    minLength={8}
                    id="password"
                    name="password"
                    type={showPassword}
                    fullWidth
                    autoComplete="password"
                    placeholder="••••••••••"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={passwordDisplay}
                            aria-label="toggle password visibility"
                            edge="end"
                          >
                            {showPassword === "password" ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={errors.password ? true : false}
                    helperText={
                      errors.password &&
                      "Password must be at least 8 characters long"
                    }
                  />
                </div>

                {/* ------------------- CONFIRM PASSWORD ------------------  */}
                <div
                  className={[SignupStyle.loginpassword, SignupStyle.formInput].join(
                    " "
                  )}
                >
                  <InputLabel
                    htmlFor="confirmPassword"
                    variant="standard"
                    required
                    sx={{
                      mb: 1.5,
                      color: "text.primary",
                      "& span": { color: "error.light" },
                      fontSize: "label.fontSize",
                    }}
                  >
                    Enter Confirmation Password
                  </InputLabel>

                  <TextInput
                    control={control}
                    required
                    validate={(value) => value === getValues("password")}
                    id="passwordConfirm"
                    name="passwordConfirm"
                    fullWidth
                    autoComplete="passwordConfirm"
                    type={showConfirmPassword}
                    placeholder="••••••••••"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={confirmPasswordDisplay}
                            aria-label="toggle password visibility"
                            edge="end"
                          >
                            {showConfirmPassword === "password" ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={errors.confirmPassword ? true : false}
                    helperText={
                      errors.confirmPassword &&
                      "Password and confirm password must match"
                    }
                  />
                </div>
              </div>
              {/* ------------------ SUBMIT BTN ---------------- */}
              <button
                id="button"
                type="submit"
                className={`${SignupStyle.btn_primary}`}
              >
                Sign up
              </button>
            </form>
            <div className={SignupStyle.bottom_text}>
              <p className={SignupStyle.bottom_para}>
                Already have an account?{" "}
                <Link className={SignupStyle.bottom_link} to="/login">
                  Login
                </Link>
              </p>
            </div>

            <hr />
            <div className={`${SignupStyle.tp_div}`}>
              <p>Sign Up with:</p>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                {/* <div className={SignupStyle.tp_icon} onClick={renderProps.onClick}>
                    <div>
                      <Google />
                    </div>
                  </div> */}

                <GoogleOAuthProvider
                  clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}
                >
                  <GoogleLogin
                    onSuccess={(data) => {
                      googleLoginSuccess(data);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </GoogleOAuthProvider>

                {/* <FacebookLogin
                  appId={`${import.meta.env.VITE_FACEBOOK_CLIENT_ID}`
                  autoLoad={false}
                  callback={responseFacebook}
                  render={(renderProps) => (
                    <div
                      className={SignupStyle.tp_icon}
                      onClick={renderProps.onClick}
                    >
                      <FacebookTwoTone />
                    </div>
                  )}
                /> */}
              </div>
            </div>
          </div>
        </div>

        <div className={SignupStyle.section2}>
          <div className={SignupStyle.section2_imagediv}>
            <img className={SignupStyle.section2_image} src={Img3} alt="" />
          </div>

          <div className={SignupStyle.main_para}>
            <p className={SignupStyle.section2_para}>
              Absolutely the best product on the market for dealing with anything as
              a seller on Amazon!!!
            </p>
            <p className={SignupStyle.section2_para1}>
              I can not think of anything else that your product could do expect sell
              the products for me! What is even more incredible about this product is
              the Freedom Ticket Training that you get for free with the purchase of
              your product!! Incredibly fantastic product and training!!!
            </p>
            <p className={SignupStyle.section2_para2}>Michael Mosely</p>
          </div>
        </div>
      </section>
    </>
  );
}
