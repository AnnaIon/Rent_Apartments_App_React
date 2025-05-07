// Toast notifications for success/failure using react-toastify
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Custom reusable password input field with show/hide toggle
import PasswordField from "../Utils/PasswordField";

// Date picker components from MUI and Day.js adapter
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { TextField } from "@mui/material";
import dayjs from "dayjs";

/**
 * Show success toast notification
 */
const successful = (message) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    transition: Bounce,
  });
};

/**
 * Show error toast notification
 */
const failed = (message) => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    transition: Bounce,
  });
};

/**
 * Validates if age derived from birthDate is between 18–120
 */
const validateAge = (birthDate) => {
  const today = new Date();
  const dob = new Date(birthDate);
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age >= 18 && age <= 120;
};

/**
 * Validates form input fields by field name
 */
function InputsValidations(name, value) {
  let validationObj = { status: true, helpText: "" };

  const emailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/gm;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/gm;

  switch (name) {
    case "email":
      if (value === "") {
        validationObj.helpText = "Field can't be empty";
      } else if (!emailRegex.test(value)) {
        validationObj.helpText = "Invalid email";
      } else {
        validationObj.status = false;
      }
      break;

    case "password":
    case "confirmPassword":
      if (value === "") {
        validationObj.helpText = "Field can't be empty";
      } else if (value.length < 6 || !passwordRegex.test(value)) {
        validationObj.helpText = "Invalid password";
      } else {
        validationObj.status = false;
      }
      break;

    case "firstName":
    case "lastName":
      if (value === "") {
        validationObj.helpText = "Field can't be empty";
      } else if (value.length < 2) {
        validationObj.helpText = `${name === "firstName" ? "First" : "Last"} Name must be longer than 2 characters`;
      } else {
        validationObj.status = false;
      }
      break;

    case "birthDate":
      if (value === "") {
        validationObj.helpText = "Field can't be empty";
      } else if (!validateAge(value)) {
        validationObj.helpText = "The age should be between 18 - 120 years";
      } else {
        validationObj.status = false;
      }
      break;

    default:
      break;
  }

  return validationObj;
}

/**
 * Checks if password and confirmPassword fields match
 */
function passwordMatch(password, confirmPassword) {
  return password === confirmPassword;
}


