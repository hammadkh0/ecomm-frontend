import { Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Person } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import UserForm from "./UserForm";
import styles from "./adduser.module.css";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { AuthContext } from "../../../context/auth-context";
import { toastError, toastSuccess } from "../../../utils/toast-message";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddUser = ({ userType, edit = false }) => {
  const [action, setAction] = useState("Add");

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (edit) {
      setAction("Edit");
    }

    return () => {
      setAction("Add");
    };
  }, []);

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (formData) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/ecomm/users/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        passwordConfirm: formData.confirmPassword,
        role: userType === "admin" ? "admin" : "user",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toastSuccess(userType + " added successfully");
          reset();
          setTimeout(() => {
            navigate(`/admin/view-${userType}s`);
          }, 1500);
        } else {
          toastError(data.message);
        }
      });
  };

  return (
    <div>
      <ToastContainer />
      <div className={styles.formContainer}>
        <section className={styles.formSection}>
          <h1 className={styles.formHeading}>
            <Person sx={{ mr: 1 }} fontSize="large" />
            <p>
              {action} {userType}
            </p>
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} sx={{ mt: 5, px: 2 }}>
              <UserForm
                control={control}
                getValues={getValues}
                setValue={setValue}
                errors={errors}
                edit={edit}
              />
              <Grid item xs={12} textAlign={"center"} sx={{ mt: 2, p: 2 }}>
                <button type="submit" className={styles.formButton}>
                  <PeopleAltIcon sx={{ mr: 1 }} fontSize="small" />
                  <span className={styles.formSpan}>
                    {action} {userType}
                  </span>
                </button>
              </Grid>
            </Grid>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AddUser;
