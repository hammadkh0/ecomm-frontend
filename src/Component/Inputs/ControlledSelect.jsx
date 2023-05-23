import { FormControl, FormHelperText, Select } from "@mui/material";
import { Controller } from "react-hook-form";

const ControlledSelect = ({
  name,
  control,
  pattern = "",
  required = false,
  defaultValue = "",
  validate = null,
  children,
  helperText = null,
  value,
  onChange,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required, pattern, validate }}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormControl fullWidth>
          <Select
            value={value}
            onChange={onChange}
            {...rest}
            {...field}
            inputRef={field.ref}
          >
            {children}
          </Select>
          {rest.error && <FormHelperText error> {helperText}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default ControlledSelect;
