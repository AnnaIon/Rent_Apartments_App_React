import styles from "../Login/Login.module.css";
import { Typography, Box, Container } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Form from "../../Components/Form";
import { useEffect, useState } from "react";
import { getUserProfileData } from "../../../firebase";
import { useOutletContext } from "react-router-dom";

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
  { id: "lastName", name: "lastName", label: "Last Name", variant: "standard" },
  {
    id: "birthDate",
    name: "birthDate",
    label: "Date of Birth",
    variant: "standard",
  },
];
const MyProfile = () => {
  const { currentUser } = useOutletContext();
  const [userData, setUserData] = useState({});

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
      <Box className="autentication__container">
        <Typography className={styles.title} sx={{ fontWeight: 'bold' }}>Profile</Typography>
        <Form
          buttonLabel={"Edit"}
          fields={PROFILE_FIELDS}
          icon={<EditIcon />}
          fieldValues={userData}
          isProfilePage={true}
          user = {currentUser}
        ></Form>
      </Box>
    </Container>
  );
};

export default MyProfile;
