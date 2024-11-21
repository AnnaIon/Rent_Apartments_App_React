import { TextField } from "@mui/material";
import { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function PasswordField({
  id,
  name,
  label,
  variant,
  onChange,
  error,
  helpText,
  value,
  isProfilePage,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      required
      key={name}
      id={id}
      name={name}
      label={label}
      variant={variant}
      fullWidth
      onChange={onChange}
      error={error}
      helperText={helpText}
      value={value ?? ""}
      type={!showPassword ? "password" : "text"}
      disabled={isProfilePage}
      slotProps={{
        input: {
          endAdornment: !isProfilePage ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {!showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : (
            ""
          ),
        },
      }}
    />
  );
}

export default PasswordField;
