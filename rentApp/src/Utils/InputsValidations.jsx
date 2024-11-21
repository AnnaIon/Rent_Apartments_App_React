import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PasswordField from "../Utils/PasswordField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import dayjs from "dayjs";

const successful = (message) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
};

const failed = (message) => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
};

const validateAge = (birthDate) => {
  const today = new Date();
  const dob = new Date(birthDate);
  console.log(dob);

  let age = today.getFullYear() - dob.getFullYear();

  const month = today.getMonth() - dob.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  console.log(age >= 18 && age <= 120);
  return age >= 18 && age <= 120;
};

function InputsValidations(name, value) {
  let validationObj = { status: true, helpText: "" };
  const emailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/gm;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/gm;

  switch (name) {
    case "email":
      if (value === "") {
        validationObj.status = true;
        validationObj.helpText = "Field can't be empty";
      } else if (!emailRegex.test(value)) {
        validationObj.status = true;
        validationObj.helpText = "Invalid email";
      } else {
        validationObj.status = false;
        validationObj.helpText = "";
      }
      break;
    case "password":
    case "confirmPassword":
      if (value === "") {
        validationObj.status = true;
        validationObj.helpText = "Field can't be empty";
      } else if (value.length < 6 || !passwordRegex.test(value)) {
        validationObj.status = true;
        validationObj.helpText = "Invalid password";
      } else {
        validationObj.status = false;
        validationObj.helpText = "";
      }
      break;
    case "lastName":
      if (value === "") {
        validationObj.status = true;
        validationObj.helpText = "Field can't be empty";
      } else if (value.length < 2) {
        validationObj.status = true;
        validationObj.helpText = "Last Name must be longer than 2 characters";
      } else {
        validationObj.status = false;
        validationObj.helpText = "";
      }
      break;
    case "firstName":
      if (value === "") {
        validationObj.status = true;
        validationObj.helpText = "Field can't be empty";
      } else if (value.length < 2) {
        validationObj.status = true;
        validationObj.helpText = "Last Name must be longer than 2 characters";
      } else {
        validationObj.status = false;
        validationObj.helpText = "";
      }
      break;

    case "birthDate":
      if (value === "") {
        validationObj.status = true;
        validationObj.helpText = "Field can't be empty";
      } else if (!validateAge(value)) {
        validationObj.status = true;
        validationObj.helpText = "The age should be between 18 - 120 years";
      } else {
        validationObj.status = false;
        validationObj.helpText = "";
      }
      break;
    default:
      break;
  }
  return validationObj;
}

function passwordMatch(password, confirmPassword) {
  return password === confirmPassword;
}

function createFormComponent(
  fieldObject,
  errorObj,
  handleChange,
  fieldValues = {},
  isProfilePage = false
) {
  const isEmpty = Object.keys(fieldValues).length == 0;

  if (fieldObject.name !== "birthDate") {
    if (fieldObject.name.match(/password/i)) {
      return (
        <PasswordField
          key={fieldObject.id}
          id={fieldObject.id}
          name={fieldObject.name}
          label={fieldObject.label}
          variant={fieldObject.variant}
          error={errorObj[fieldObject.name]?.status}
          helpText={errorObj[fieldObject.name]?.helpText}
          onChange={handleChange}
          value={fieldValues[fieldObject.name] ?? ""}
          isProfilePage={isProfilePage}
        ></PasswordField>
      );
    } else {
      return (
        <TextField
          required
          value={isEmpty ? "" : fieldValues[fieldObject.name]}
          key={fieldObject.id}
          id={fieldObject.id}
          name={fieldObject.name}
          label={fieldObject.label}
          variant={fieldObject.variant}
          fullWidth
          onChange={handleChange}
          error={errorObj[fieldObject.name]?.status}
          helperText={errorObj[fieldObject.name]?.helpText}
          type={"text"}
          disabled={isProfilePage}
          sx={{
            mt: "5px",
            input: {
              color: "white", // Text color
            },
            // "& .MuiInputBase-input::placeholder": {
            //   color: "hsla(13, 96%, 67%, 1)", // Placeholder color
            //   opacity: 1, // Full opacity
            // },
            // "& .MuiOutlinedInput-notchedOutline": {
            //   borderColor: "hsla(13, 96%, 67%, 1)", // Border color
            // },
            // "& .MuiFormLabel-root": {
            //   color: "hsla(13, 96%, 67%, 1)", // Label color
            // },

            // "& .MuiInputLabel-root": {
            //   color: "hsla(13, 96%, 67%, 1)", // Label color for other states
            // },
          }}
        />
      );
    }
  }

  let birthDateDayJs = null;
  const firestoreTimestamp = fieldValues[fieldObject.name];
  if (firestoreTimestamp) {
    const birthDate = new Date(
      firestoreTimestamp.seconds * 1000 + firestoreTimestamp.nanoseconds / 1e6
    );

    birthDateDayJs = dayjs(birthDate);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} key={fieldObject.id}>
      <DemoContainer
        components={["SingleInputDateRangeField"]}
        sx={{
          width: "100%",
          input: {
            color: "white",
          },
          "& .MuiInputBase-input::placeholder": {
            color: "white",
            opacity: 1,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "& .MuiFormLabel-root": {
            color: "white",
          },
          "& .MuiFormLabel-root.Mui-focused": {
            color: "white",
          },
          "& .MuiInputLabel-root": {
            color: "white",
          },
        }}
      >
        <DatePicker
          label={fieldObject.label}
          sx={{ width: "100%" }}
          slotProps={{
            textField: {
              helperText: errorObj[fieldObject.name]?.status
                ? errorObj[fieldObject.name]?.helpText
                : "",
              error: errorObj[fieldObject.name]?.status,
            },
          }}
          disableFuture
          onChange={handleChange}
          value={birthDateDayJs}
          disabled={isProfilePage}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

function buildInitialStateObject(fieldsObj) {
  let finalObj = {};

  for (let field of fieldsObj) {
    finalObj[field.name] = "";
  }

  return finalObj;
}

function anyError(error) {
  Object.keys(error).forEach((x) => {
    if (x[status]) {
      return true;
    }
  });
  return false;
}

function applyFilter(filterObj, flats) {
  console.log(filterObj);
  let filterFlats = [];
  let flatsObj = {};
  Object.keys(flats).forEach((userId) => {
    Object.keys(filterObj).forEach((key) => {
      switch (key) {
        case "AZ":
          if (filterObj[key]) {
            console.log(flats[userId]);
            flats[userId].sort((a, b) => {
              const first = a.title.toLowerCase();
              const second = b.title.toLowerCase();
              if (first < second) return -1;
            });
            filterFlats = [...flats[userId]];
          }
          break;
        case "ZA":
          if (filterObj[key]) {
            flats[userId].sort((a, b) => {
              const first = a.title.toLowerCase();
              const second = b.title.toLowerCase();
              if (second < first) return -1;
            });
            filterFlats = [...flats[userId]];
          }
          break;
        case "minArea":
          if (filterObj[key]) {
            flats[userId].sort((a, b) => a.areaSize - b.areaSize);
            filterFlats = [...flats[userId]];
          }
          break;
        case "maxArea":
          if (filterObj[key]) {
            flats[userId].sort((a, b) => b.areaSize - a.areaSize);
            filterFlats = [...flats[userId]];
          }
          break;
        case "minPrice":
          if (filterObj[key]) {
            flats[userId].sort((a, b) => a.rentPrice - b.rentPrice);
            filterFlats = [...flats[userId]];
          }
          break;
        case "maxPrice":
          if (filterObj[key]) {
            flats[userId].sort((a, b) => b.rentPrice - a.rentPrice);
            filterFlats = [...flats[userId]];
          }
          break;
        case "city":
          if (filterObj[key] !== "") {
            filterFlats = flats[userId].filter((flat) =>
              flat.city.includes(filterObj[key])
            );
            console.log(filterFlats);
          }
          break;


      }
    });
    const areaMin = filterObj["minAreaRange"];
    const areaMax = filterObj["maxAreaRange"];
    const priceMin = filterObj["minPriceRange"];
    const priceMax = filterObj["maxPriceRange"];
    filterFlats = filterFlats.filter((flat) =>
      checkRange(
        flat.areaSize,
        flat.rentPrice,
        areaMin,
        areaMax,
        priceMin,
        priceMax
      )
    );

    flatsObj[userId] = filterFlats;
  });

  console.log(flatsObj);
  return flatsObj;
}

function checkRange(areaSize, rentPrice, areaMin, areaMax, priceMin, priceMax){
  
  let isAreaGood = areaMax == 0 ? true : (parseInt(areaSize)  >= parseInt(areaMin) && parseInt(areaSize) <= parseInt(areaMax));
  let isPriceGood = priceMax == 0 ? true : (parseInt(rentPrice) >= parseInt(priceMin) && parseInt(rentPrice) <= parseInt(priceMax));

  return isAreaGood && isPriceGood;

}

export {
  InputsValidations,
  passwordMatch,
  successful,
  failed,
  createFormComponent,
  buildInitialStateObject,
  anyError,
  applyFilter,
};
