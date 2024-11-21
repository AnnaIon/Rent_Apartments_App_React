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

import { useNavigate, useOutletContext } from "react-router-dom";

import {
  emailAlreadyTaken,
  userRegistration,
  signIn,
  updateUserData,
  handleDeleteAccount,
} from "../../firebase";

import DoneIcon from "@mui/icons-material/Done";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { yellow } from "@mui/material/colors";
import { lime } from "@mui/material/colors";

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

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (Object.keys(fieldValues).length > 0) {
      setFormData(fieldValues);
    } else {
      setFormData(buildInitialStateObject(fields));
    }
  }, [fields, fieldValues]); 

  const handleChange = (e) => {
    let errorsState = {}; 
    let isDatePickerObj = e.target === undefined || e.target === null; 
    let fieldName = ""; 
    let fieldValue = ""; 

    if (isDatePickerObj) {
      console.log(e); 
      errorsState = InputsValidations("birthDate", e); 
      fieldName = "birthDate"; 
    } else {

      const { name, value } = e.target;
      errorsState = InputsValidations(name, value); 
      fieldName = name; 
      fieldValue = value; 
      console.log(name, value); 
    }

    setError({ ...error, [fieldName]: errorsState });

    setFormData({
      ...formData,
      [fieldName]: !isDatePickerObj ? fieldValue : new Date(e), 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (isProfilePage) {
      await updateUserData(user, formData); 
      setEdit(false); 
      return;
    }

    if (buttonLabel.match(/login/i)) {
      const response = await signIn(formData); 
      console.log(response); 

      if (response.success) {
        navigate("/homepage");
      }
    } else {
      let password = formData.password;
      let confirmPassword = formData.confirmPassword;

      if (passwordMatch(password, confirmPassword) && !anyError(error)) {
        let email = formData["email"];
        let dateOfBirth = formData["birthDate"];
        let firstName = formData["firstName"];
        let lastName = formData["lastName"];

        if (await emailAlreadyTaken(email)) {
          let message = "Email already exists in the database";
          failed(message);
        } else {
          const success = await userRegistration(
            email,
            password,
            dateOfBirth,
            firstName,
            lastName
          );
          if (success) {
            let message = "Successfully registered";
            successful(message); 
        }
      }
    }
    setEdit(false); 
  };

  const handleEditClick = () => {
    setEdit(!edit);
  };

  const handleDelete = () => {
    handleDeleteAccount()
      .then(() => {
        navigate("/authentication");
      })
      .catch((error) => {
        console.log("Failed to delete account:", error);
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
      {fields.map((field) => {
        if (isProfilePage)
          return createFormComponent(
            field,
            error,
            handleChange,
            formData,
            !edit
          );

        return createFormComponent(field, error, handleChange, formData);
      })}
      {isProfilePage ? (
        <Button
          startIcon={<HighlightOffIcon />}
          variant="contained"
          color="primary"
          sx={{ fontWeight: "bold", mt: "2rem" }}
          onClick={handleDelete}
        >
          DELETE ACCOUNT
        </Button>
      ) : null}
      {edit ? (
        <Button
          startIcon={<DoneIcon />}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ fontWeight: "bold", width: "50%", mt: "2rem" }}
        >
          Save
        </Button>
      ) : (
        <Button
          startIcon={icon} 
          variant="contained" 
          color="primary" 
          onClick={isProfilePage ? handleEditClick : handleSubmit}
          sx={{ fontWeight: "bold", width: "50%", mt: "2rem" }} 
        >
          {buttonLabel}
        </Button>
      )}
    </form>
  );
}
}
export default Form;
