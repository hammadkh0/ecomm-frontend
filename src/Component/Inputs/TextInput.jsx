import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const TextInput = ({
  name,
  control,
  pattern = "",
  required = false,
  minLength = null,
  maxLength = null,
  validate = null,
  defaultValue = "",
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required, pattern, minLength, maxLength, validate }}
      defaultValue={defaultValue}
      render={({ field }) => (
        <TextField
          variant="outlined"
          sx={{
            // override padding for MuiOutlinedInput
            "& .MuiOutlinedInput-root input": {
              padding: "12px",
              color: "text.secondary",
              fontWeight: 100,
            },
          }}
          {...rest}
          {...field}
          inputRef={field.ref}
        />
      )}
    />
  );
};

export default TextInput;
