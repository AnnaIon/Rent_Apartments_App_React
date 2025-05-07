import {
  successful,
  failed,
  anyError,
  buildInitialStateObject,
  createFormComponent,
  InputsValidations,
  passwordMatch,
} from "../Utils/InputsValidations";

import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  emailAlreadyTaken,
  userRegistration,
  signIn,
  updateUserData,
  handleDeleteAccount,
} from "../../firebase";

import DoneIcon from "@mui/icons-material/Done";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

// Main reusable Form component for Login/Register/Profile actions
function Form({
  fields,
  buttonLabel,
  icon,
  fieldValues,
  user,
  userId,
  isProfilePage = false,
}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState({});
  const [edit, setEdit] = useState(false); // Toggle edit mode for profile

  // Initialize form data based on passed-in field values or default
  useEffect(() => {
    if (Object.keys(fieldValues).length > 0) {
      setFormData(fieldValues);
    } else {
      setFormData(buildInitialStateObject(fields));
    }
  }, [fields, fieldValues]);

  // Handles input changes and performs field-level validation
  const handleChange = (e) => {
    let isDatePicker = e?.target === undefined;
    let fieldName = isDatePicker ? "birthDate" : e.target.name;
    let fieldValue = isDatePicker ? new Date(e) : e.target.value;

    const fieldError = InputsValidations(fieldName, fieldValue);

    setError((prev) => ({ ...prev, [fieldName]: fieldError }));
    setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
  };

  // Handles form submit logic for Login, Register, and Profile edit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isProfilePage) {
      await updateUserData(user, formData);
      setEdit(false);
      return;
    }

    if (/login/i.test(buttonLabel)) {
      const response = await signIn(formData);
      if (response.success) navigate("/homepage");
    } else {
      const { email, password, confirmPassword, birthDate, firstName, lastName } = formData;

      if (passwordMatch(password, confirmPassword) && !anyError(error)) {
        if (await emailAlreadyTaken(email)) {
          failed("Email already exists in the database");
        } else {
          const success = await userRegistration(email, password, birthDate, firstName, lastName);
          if (success) successful("Successfully registered");
        }
      }
      setEdit(false);
    }
  };

  const handleEditClick = () => setEdit((prev) => !prev);

  const handleDelete = () => {
    handleDeleteAccount()
      .then(() => navigate("/authentication"))
      .catch((error) => {
        console.error("Failed to delete account:", error);
        failed("Account deletion failed.");
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "100%",
        padding: "1em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {fields.map((field) =>
        createFormComponent(field, error, handleChange, formData, isProfilePage && !edit)
      )}

      {/* DELETE button for profile mode */}
      {isProfilePage && (
        <Button
          startIcon={<HighlightOffIcon />}
          variant="contained"
          color="error"
          sx={{ fontWeight: "bold", mt: "2rem" }}
          onClick={handleDelete}
        >
          Delete Account
        </Button>
      )}

      {/* Toggle between Save and Edit / Login / Register */}
      {isProfilePage && !edit ? (
        <Button
          startIcon={icon}
          variant="contained"
          color="primary"
          sx={{ fontWeight: "bold", width: "50%", mt: "2rem" }}
          onClick={handleEditClick}
        >
          {buttonLabel}
        </Button>
      ) : (
        <Button
          startIcon={edit ? <DoneIcon /> : icon}
          variant="contained"
          color="primary"
          sx={{ fontWeight: "bold", width: "50%", mt: "2rem" }}
          type="submit"
        >
          {edit ? "Save" : buttonLabel}
        </Button>
      )}
    </form>
  );
}

export default Form;
