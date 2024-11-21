/* eslint-disable no-unused-vars */
import styles from "./Login.module.css";
import { Typography, Box } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { ThemeProvider } from "@mui/material/styles";
import Form from "../../Components/Form";


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

const Login = (theme) => {
  return (
    <Box className="authentication__form__container displayFlexCentered">
      <Typography className={styles.title}  sx={{ fontWeight: 'bold' }}>
        Login
      </Typography>
      <ThemeProvider theme={theme}>
        <Form
          buttonLabel={"Login"}
          fields={LOGIN_FIELDS}
          icon={<LoginIcon />}
          fieldValues={{}}
        ></Form>
      </ThemeProvider>
    </Box>
  );
};

export default Login;
