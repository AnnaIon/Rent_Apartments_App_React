import styles from "../Login/Login.module.css"; // Reuse of Login styles for consistent UI
import { Typography, Box } from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Form from "../../Components/Form"; // Reusable form component

// Field configuration for the registration form
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
  {
    id: "lastName",
    name: "lastName",
    label: "Last Name",
    variant: "standard",
  },
  {
    id: "birthDate",
    name: "birthDate",
    label: "Date of Birth",
    variant: "standard",
  },
];

// Register component - renders the registration form UI
const Register = () => {
  return (
    <Box className="authentication__form__container displayFlexCentered">
      {/* Title */}
      <Typography className={styles.title} sx={{ fontWeight: 'bold' }}>
        Register
      </Typography>

      {/* Reusable Form component */}
      <Form
        buttonLabel={"Register"}
        fields={REGISTER_FIELDS}
        icon={<AppRegistrationIcon />}
        fieldValues={{}} // Initial empty state
      />
    </Box>
  );
};

export default Register;
