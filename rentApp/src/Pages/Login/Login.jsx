/* eslint-disable no-unused-vars */
import styles from "./Login.module.css";
import { Typography, Box } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { ThemeProvider } from "@mui/material/styles";
import Form from "../../Components/Form";

// Field configuration for the login form
const LOGIN_FIELDS = [
  { id: "emailInput", name: "email", label: "Email", variant: "standard" },
  {
    id: "passwordInput",
    name: "password",
    label: "Password",
    variant: "standard",
    color: "secondary",
  },
];

/**
 * Login component - renders the login form
 * @param {object} props - Props passed to component
 * @param {object} props.theme - MUI theme object to apply custom theming
 */
const Login = ({ theme }) => {
  return (
    <Box className="authentication__form__container displayFlexCentered">
      {/* Page title */}
      <Typography className={styles.title} sx={{ fontWeight: 'bold' }}>
        Login
      </Typography>

      {/* ThemeProvider to inject custom MUI theme into the form */}
      <ThemeProvider theme={theme}>
        <Form
          buttonLabel="Login"
          fields={LOGIN_FIELDS}
          icon={<LoginIcon />}
          fieldValues={{}} // Initial empty state
        />
      </ThemeProvider>
    </Box>
  );
};

export default Login;
