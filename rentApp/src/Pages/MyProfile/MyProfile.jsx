import styles from "../Login/Login.module.css";
import { Typography, Box, Container } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Form from "../../Components/Form";
import { useEffect, useState } from "react";
import { getUserProfileData } from "../../../firebase";
import { useOutletContext } from "react-router-dom";

// Field configuration for the profile form
const PROFILE_FIELDS = [
  { id: "emailInput", name: "email", label: "Email", variant: "standard" },
  {
    id: "passwordInput",
    name: "password",
    label: "Password",
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

const MyProfile = () => {
  // Access the authenticated user from the layout context
  const { currentUser } = useOutletContext();

  // Store fetched user data for profile form population
  const [userData, setUserData] = useState({});

  // Fetch user profile data from Firebase on mount
  useEffect(() => {
    const getUserAsync = async () => {
      const data = await getUserProfileData(currentUser);
      setUserData(data);
    };

    getUserAsync();
  }, []);

  return (
    <Container
      disableGutters
      maxWidth="false"
      sx={{
        height: "100%",
        flexDirection: "column",
      }}
      classes={{ root: "displayFlexCentered" }}
    >
      {/* Profile section layout */}
      <Box className="autentication__container">
        {/* Page Title */}
        <Typography className={styles.title} sx={{ fontWeight: 'bold' }}>
          Profile
        </Typography>

        {/* Reusable Form component in profile (read-only) mode */}
        <Form
          buttonLabel={"Edit"}
          fields={PROFILE_FIELDS}
          icon={<EditIcon />}
          fieldValues={userData}
          isProfilePage={true} // disables inputs and password visibility toggle
          user={currentUser}
        />
      </Box>
    </Container>
  );
};

export default MyProfile;
