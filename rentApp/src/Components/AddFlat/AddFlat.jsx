import styles from "../AddFlat/AddFlat.module.css";
import Grid2 from "@mui/material/Grid2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../firebase";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Button, Box } from "@mui/material";
import dayjs from "dayjs";

/**
 * AddFlat Component
 * Provides a form to allow authenticated users to add a new flat listing
 * to their user document in Firebase Firestore.
 */
const AddFlat = () => {
  // Flat form state
  const [flatData, setFlatData] = useState({
    id: Date.now(),           // unique ID based on timestamp
    title: "",
    city: "",
    streetName: "",
    streetNumber: "",
    areaSize: "",
    hasAc: false,
    yearBuild: "",
    rentPrice: "",
    dateAvailable: null,
    isFavourite: false,
  });

  const navigate = useNavigate();

  // Generic input change handler for both text and checkbox inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFlatData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Date change handler for DatePicker (formatted as YYYY-MM-DD)
  const handleDateChange = (newDate) => {
    setFlatData((previous) => ({
      ...previous,
      dateAvailable: newDate ? dayjs(newDate).format("YYYY-MM-DD") : "",
    }));
  };

  // Submit handler to store the flat inside the authenticated user's Firestore document
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Firebase Auth listener to get current user
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        const fetchUserData = async () => {
          if (user) {
            const flatsCollection = doc(db, "users", user.uid);
            const flatDoc = await getDoc(flatsCollection);

            if (flatDoc.exists()) {
              const findFlatData = flatDoc.data();
              const flatArr = findFlatData.flats || [];
              flatArr.push(flatData); // Add new flat

              // Update Firestore with new flats array
              await updateDoc(flatsCollection, {
                flats: flatArr,
              });

              // Redirect to homepage after submission
              navigate("/homepage");
            }
          }
        };
        fetchUserData();
      });

      // Clean up the Auth listener
      return () => unsubscribe();
    } catch (error) {
      console.log("Error adding flat", error);
    }
  };

  return (
    <Box sx={{ backgroundColor: 'white', p: '2rem', borderRadius: '10px' }}>
      <form onSubmit={handleSubmit}>
        <Grid2
          container
          spacing={3}
          sx={{
            mt: "1rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Title Field */}
          <TextField
            label="Title"
            name="title"
            variant="standard"
            value={flatData.title}
            onChange={handleChange}
          />

          {/* City Field */}
          <TextField
            label="City"
            name="city"
            variant="standard"
            value={flatData.city}
            onChange={handleChange}
          />

          {/* Street Name Field */}
          <TextField
            label="Street Name"
            name="streetName"
            variant="standard"
            value={flatData.streetName}
            onChange={handleChange}
          />

          {/* Has AC Checkbox */}
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Has AC"
              name="hasAc"
              onChange={handleChange}
              checked={flatData.hasAc}
              sx={{ color: 'grey' }}
            />
          </FormGroup>

          {/* Street Number */}
          <TextField
            label="Street Number"
            name="streetNumber"
            variant="standard"
            value={flatData.streetNumber}
            onChange={handleChange}
          />

          {/* Area Size */}
          <TextField
            label="Area Size"
            name="areaSize"
            variant="standard"
            value={flatData.areaSize}
            onChange={handleChange}
          />

          {/* Date Available */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Available From"
              onChange={handleDateChange}
              value={flatData.dateAvailable ? dayjs(flatData.dateAvailable) : null}
            />
          </LocalizationProvider>

          {/* Year Built */}
          <TextField
            label="Year Build"
            name="yearBuild"
            variant="standard"
            value={flatData.yearBuild}
            onChange={handleChange}
          />

          {/* Rent Price */}
          <TextField
            label="Rent Price"
            name="rentPrice"
            variant="standard"
            value={flatData.rentPrice}
            onChange={handleChange}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: '20%' }}
          >
            Add
          </Button>
        </Grid2>
      </form>
    </Box>
  );
};

export default AddFlat;
