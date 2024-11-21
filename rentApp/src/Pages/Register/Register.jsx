import styles from "../Login/Login.module.css";
import { Typography, Box } from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Form from "../../Components/Form";

const REGISTER_FIELDS = [
  { id: "emailInput", name: "email", label: "Email", variant: "standard" },
  {
    id: "passwordInput",
    name: "password",
    label: "Password",
    variant: "standard",
  },
  {
    id: "confirmPasswordInput",
    name: "confirmPassword",
    label: "Confirm Password",
    variant: "standard",
  },
  {
    id: "firstName",
    name: "firstName",
    label: "First Name",
    variant: "standard",
  },
  { id: "lastName", name: "lastName", label: "Last Name", variant: "standard" },
  {
    id: "birthDate",
    name: "birthDate",
    label: "Date of Birth",
    variant: "standard",
  },
];

const Register = () => {
  return (
    <Box className="authentication__form__container displayFlexCentered">
      <Typography className={styles.title} sx={{ fontWeight: 'bold' }}>Register</Typography>
      <Form
        buttonLabel={"Register"}
        fields={REGISTER_FIELDS}
        icon={<AppRegistrationIcon />}
        fieldValues={{}}
      ></Form>
    </Box>
  );
};

export default Register;
