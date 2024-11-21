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
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { Box } from "@mui/material";


const AddFlat = () => {
  const [flatData, setFlatData] = useState({
    id: Date.now(),
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFlatData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleDateChange = (newDate) => {
    setFlatData((previous) => ({
      ...previous,
      dateAvailable: newDate ? dayjs(newDate).format("YYYY-MM-DD") : "", // Format as a string
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        const fetchUserData = async () => {
          if (user) {
            const flatsCollection = doc(db, "users", user.uid);
            const flatDoc = await getDoc(flatsCollection);
            if (flatDoc.exists()) {
              const findFlatData = flatDoc.data();
              const flatArr = findFlatData.flats;
              flatArr.push(flatData);

              await updateDoc(flatsCollection, {
                flats: flatArr,
              });
              navigate("/homepage");
            }
          }
        };
        fetchUserData();
      });

      return () => unsubscribe();
    } catch (error) {
      console.log("Error adding flat", error);
    }
  };

  return (
    <Box sx={{backgroundColor:'white', p:'2rem',borderRadius:'10px'}}>
      <form  onSubmit={handleSubmit}>
        <Grid2 container spacing={3} sx={{ mt: "1rem" ,justifyContent:"center" ,alignItems:"center"}}>
          <TextField
            id="standard-basic"
            label="title"
            name= "title"
            variant="standard"
            value={flatData.title}
            onChange={handleChange}
          />

          <TextField
            id="standard-basic"
            label="city"
              name= "city"
            variant="standard"
            value={flatData.city}
            onChange={handleChange}
          />

          <TextField
            id="standard-basic"
              name= "streetName"
            label="Street Name"
            variant="standard"
            value={flatData.streetName}
            onChange={handleChange}
          />
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Has AC:"
              name= "hasAc"
              onChange={handleChange}
              checked={flatData.hasAc}
              sx={{color:'grey'}}
            />
          </FormGroup>
          <TextField
            id="standard-basic"
            label="Street Number"
              name= "streetNumber"
            variant="standard"
            value={flatData.streetNumber}
            onChange={handleChange}
          />
          <TextField
            id="standard-basic"
            label="Area Size"
            variant="standard"
            name='areaSize'
            value={flatData.areaSize}
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
       
              <DatePicker
                onChange={handleDateChange}
                value={flatData.dateAvailable ? dayjs(flatData.dateAvailable) : null}
              />
          </LocalizationProvider>

          
          <TextField
            id="standard-basic"
              name="yearBuild"
            label="Year Build"
            variant="standard"
            value={flatData.yearBuild}
            onChange={handleChange}
          />
          <TextField
            id="standard-basic"
              name="rentPrice"
            label="Rent Price"
            variant="standard"
            value={flatData.rentPrice}
            onChange={handleChange}
          />

          <Button  type="submit"  variant="contained" color="primary" sx={{width:'20%'}}>
            Add
          </Button>
        </Grid2>
      </form>
    </Box>
  );
};

export default AddFlat;
