import { TextField } from "@mui/material";
import { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

/**
 * Reusable password input field with toggle visibility.
 * Uses MUI TextField and includes visibility toggle logic.
 *
 * Props:
 * - id: HTML id for the input
 * - name: input name
 * - label: input label
 * - variant: MUI TextField variant (outlined, filled, etc.)
 * - onChange: function to handle input change
 * - error: boolean for validation error
 * - helpText: helper or error text below the field
 * - value: controlled value of the input
 * - isProfilePage: disables input and hides toggle if true
 */
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
  // Local state to toggle password visibility
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
      type={showPassword ? "text" : "password"} // Toggle between masked and visible
      disabled={isProfilePage} // Disable input on profile page if needed
      slotProps={{
        input: {
          endAdornment: !isProfilePage ? (
            // Show visibility toggle icon if not in profile view
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
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
