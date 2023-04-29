import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlternateEmail, Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { IconButton, InputAdornment, InputLabel } from "@mui/material";

import { AuthContext } from "../../context/auth-context";
import { ToastContainer } from "react-toastify";
import { toastError, toastSuccess } from "../../utils/toast-message";
import TextInput from "../../Component/Inputs/TextInput";
import { useHttpClient } from "../../hooks/http-hook";

import Logo1 from "../../Images/Logo.png";
import LoginStyle from "./login.module.css";
import Img3 from "../../Images/Signup_image.png";

import SignupStyle from "./signupstyle.module.css";

function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState("password");
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    // cleanup function
    return () => {
      setShowPassword("password");
    };
  }, []);

  const passwordDisplay = () => {
    showPassword === "text" ? setShowPassword("password") : setShowPassword("text");
  };
  const PasswordError = () => (
    <p>
      Password must contain at least <br /> One lowercase letter <br />
      One uppercase letter <br />
      One digit <br />
      One special character <br />
      Length of the password is at least 8 characters.
    </p>
  );
  const authSubmitHandler = async (formData) => {
    try {
      const responseData = await sendRequest(
        `${import.meta.env.VITE_BACKEND_URL}/ecomm/users/login`,
        "POST",
        JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      if (responseData.status === "success") {
        toastSuccess("Login Successful!");
        const user = responseData.data.user;
        setTimeout(() => {
          auth.login(user._id, user.role, responseData.token, user.name);
          user.role === "user"
            ? navigate("/dashboard")
            : navigate("/admin/dashboard");
        }, 1500);
      } else {
        toastError(responseData.message);
      }
    } catch (error) {}
  };

  return (
    <>
      <section className={LoginStyle.mainsection}>
        <div className={SignupStyle.section1}>
          <div className={LoginStyle.loginform}>
            <div className={LoginStyle.top_image}>
              <img src={Logo1} alt="" />
            </div>
            <h2 className={LoginStyle.loginheading}>Login to EcomBuddy</h2>

            <div className={LoginStyle.main_form}>
              <form onSubmit={handleSubmit(authSubmitHandler)}>
                <ToastContainer />

                {/* ----------------- EMAIL ------------------ */}
                <div className={LoginStyle.logintextfield}>
                  <div className={LoginStyle.loginemail}>
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

                  {/* -------------------- PASSWORD ------------------- */}
                  <div className={LoginStyle.loginpassword}>
                    <InputLabel
                      htmlFor="password"
                      variant="standard"
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
                      minLength={8}
                      required={true}
                      pattern={
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&^+-_])[a-zA-Z\d@$!%*#?&^+-_]{8,}$/
                      }
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
                      helperText={errors.password && <PasswordError />}
                    />
                  </div>

                  <div className={LoginStyle.forgetPasswordHolder}>
                    <Link to="/recover-password">
                      <p>Forget password?</p>
                    </Link>
                  </div>
                </div>
                <button
                  id="button"
                  type="submit"
                  className={`${LoginStyle.btn_primary}`}
                >
                  Log In
                </button>
              </form>
              <div className={LoginStyle.bottom_text}>
                <p className={LoginStyle.bottom_para}>
                  Don't have an account?{" "}
                  <Link className={LoginStyle.bottom_link} to="/signup">
                    Register now
                  </Link>
                </p>
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

export default Login;
