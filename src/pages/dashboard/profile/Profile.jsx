import React, { useContext, useEffect, useState } from "react";
import style from "./profile.module.css";
import { AuthContext } from "../../../context/auth-context";
import {
  Avatar,
  Backdrop,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

import { useAuth } from "../../../hooks/auth-hook";
import { useForm } from "react-hook-form";
import TextInput from "../../../Component/Inputs/TextInput";
import { AlternateEmail, Visibility, VisibilityOff } from "@mui/icons-material";

import ImageUpload from "../../../utils/image-upload";

function Main_profile() {
  const {
    handleSubmit: handleUserSubmit,
    control: userControl,
    setValue: setUserValue,
    formState: { errors: userErrors },
    watch: userWatch,
  } = useForm({
    mode: "onChange",
  });
  const {
    handleSubmit: handlePasswordSubmit,
    control: passwordControl,
    getValues: getPasswordValues,
    setValue: setPasswordValue,
    formState: { errors: passwordErrors },
    watch: passwordWatch,
  } = useForm({
    mode: "onChange",
  });
  const auth = useContext(AuthContext);
  const { updateContext } = useAuth();
  const [showOldPassword, setShowOldPassword] = useState("password");
  const [showPassword, setShowPassword] = useState("password");
  const [showConfirmPassword, setShowConfirmPassword] = useState("password");
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState("");

  const oldPasswordDisplay = () => {
    showOldPassword === "text"
      ? setShowOldPassword("password")
      : setShowOldPassword("text");
  };
  const passwordDisplay = () => {
    showPassword === "text" ? setShowPassword("password") : setShowPassword("text");
  };
  const confirmPasswordDisplay = () => {
    showConfirmPassword === "text"
      ? setShowConfirmPassword("password")
      : setShowConfirmPassword("text");
  };

  const getImage = (img) => {
    setImage(img);
  };
  const {
    wrapper,
    userCard,
    imageCard,
    userImageHolder,
    userTextInfoHolder,
    profileFields,
    imageBtn,
  } = style;

  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/ecomm/users/me`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        const userData = await res.json();
        const user = userData.data.user;
        setUser(user);
        setUserValue("name", user.name);
        setUserValue("email", user.email);
        if (user.image) setUserValue("image", user.image);
        setIsLoading(false);
      } catch (err) {
        toast.error("Something went wrong", {
          position: "top-center",
          autoClose: 1500,
          closeOnClick: true,
          pauseOnHover: false,
        });
      }
    }

    setTimeout(() => {
      getUser();
    }, 500);
  }, []);

  const handleFormSubmit = async (formData) => {
    console.log("updating", formData);
    try {
      // const formData = new FormData();
      // formData.append("name", name);
      // formData.append("email", email);
      // formData.append("image", image);

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/ecomm/users/updateMe`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Origin": import.meta.env.VITE_BACKEND_URL,
            Authorization: `Bearer ${auth.token}`,
          },
          mode: "cors",
          body: JSON.stringify({ name: formData.name, email: formData.email }),
        }
      );

      const data = await res.json();
      if (data.status === "success") {
        toast.success("User updated successfully", {
          position: "top-center",
          autoClose: 500,
          closeOnClick: true,
          pauseOnHover: false,
        });
        updateContext(data.data.user.name);
        setTimeout(() => {
          window.location.reload(false);
        }, 1500);
      } else {
        toast.error(data.message, {
          position: "top-center",
          autoClose: 1500,
          closeOnClick: true,
          pauseOnHover: false,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updatePassword = async (formData) => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/ecomm/users/updatePassword`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Origin": import.meta.env.VITE_BACKEND_URL,
          Authorization: `Bearer ${auth.token}`,
        },
        mode: "cors",
        body: JSON.stringify({
          currentPassword: formData.oldPassword,
          password: formData.password,
          passwordConfirm: formData.passwordConfirm,
        }),
      }
    );
    const data = await res.json();
    if (data.status === "success") {
      setPasswordValue("currentPassword", "");
      setPasswordValue("password", "");
      setPasswordValue("passwordConfirm", "");

      toast.success("Password reset successfully", {
        position: "top-center",
        autoClose: 500,
        closeOnClick: true,
        pauseOnHover: false,
      });

      updateContext(null, data.token);
    } else {
      toast.error(data.message, {
        position: "top-center",
        autoClose: 1500,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  };

  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <div className={wrapper}>
      <ToastContainer />

      <div className={userCard}>
        <h3 style={{ marginTop: 0, marginBottom: "1rem" }}>
          Update profile information
        </h3>
        <form onSubmit={handleUserSubmit(handleFormSubmit)}>
          {/* <ImageUpload getImage={getImage} /> */}
          <div className={`${userCard} ${imageCard}`}>
            <div className={userImageHolder}>
              <Avatar
                sx={{ height: 100, width: 100 }}
                src={`${import.meta.env.VITE_BACKEND_URL}/${image}`}
              />
            </div>

            <div className={userTextInfoHolder}>
              <h1>{user.name}</h1>
              <p>{user.email}</p>
              <div>
                {/* <Button variant="contained" component="label">
                  Update Image
                  <input
                    hidden
                    accept="images/*"
                    type="file"
                    name="image"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                  />
                </Button> */}
              </div>
            </div>
          </div>

          {/* ------------------ UPDATE PROFILE INFORMATION ------------ */}
          <div className={profileFields}>
            <div>
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
                control={userControl}
                required
                maxLength={30}
                name="name"
                placeholder="John Doe"
                id="name"
                fullWidth
                autoComplete="family-name"
                error={userErrors.name ? true : false}
                helperText={userErrors.name && "Name is required"}
              />
            </div>
            <div>
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
                control={userControl}
                required={true}
                pattern={/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/}
                name="email"
                id="email"
                placeholder="johndoe@gmail.com"
                fullWidth
                autoComplete="email"
                error={userErrors.email ? true : false}
                helperText={userErrors.email && "Invalid email address"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmail />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div>
              {/* watch is a subscriber from react-hook-form taht will subscribe to the inputs and watch for the changes */}
              <Button
                type="submit"
                variant="outlined"
                sx={{
                  height: 40,
                }}
                disabled={!userWatch("name") || !userWatch("email")}
              >
                Update Profile
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* ------------------- UPDATE PASSWORD --------------------- */}
      <div className={userCard}>
        <h3>Update Password</h3>
        <form onSubmit={handlePasswordSubmit(updatePassword)}>
          <div className={profileFields}>
            <div>
              <InputLabel
                htmlFor="oldPassword"
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
                control={passwordControl}
                required
                minLength={8}
                id="oldPassword"
                name="oldPassword"
                type={showOldPassword}
                fullWidth
                autoComplete="oldPassword"
                placeholder="••••••••••"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={oldPasswordDisplay}
                        aria-label="toggle password visibility"
                        edge="end"
                      >
                        {showOldPassword === "password" ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={passwordErrors.oldPassword ? true : false}
                helperText={
                  passwordErrors.oldPassword &&
                  "Password must be at least 8 characters long"
                }
              />
            </div>

            <div>
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
                control={passwordControl}
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
                error={passwordErrors.password ? true : false}
                helperText={
                  passwordErrors.password &&
                  "Password must be at least 8 characters long"
                }
              />
            </div>

            <div>
              <InputLabel
                htmlFor="passwordConfirm"
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
                control={passwordControl}
                required
                validate={(value) => value === getPasswordValues("password")}
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
                error={passwordErrors.passwordConfirm ? true : false}
                helperText={
                  passwordErrors.passwordConfirm &&
                  "Password and confirm password must match"
                }
              />
            </div>

            <div>
              <Button
                type="submit"
                variant="outlined"
                sx={{
                  height: 40,
                }}
                disabled={
                  !passwordWatch("oldPassword") ||
                  !passwordWatch("password") ||
                  !passwordWatch("passwordConfirm")
                }
              >
                UPDATE
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Main_profile;
