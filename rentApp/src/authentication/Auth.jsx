import { Outlet, useOutletContext,Navigate } from "react-router-dom";
import AuthNavigation from "../authentication/Navigation";
import { Container, Box } from "@mui/material";
import { useEffect } from "react";
import { yellow } from '@mui/material/colors';
import { lime  } from '@mui/material/colors';


const Auth = () => {
  const { currentUser } = useOutletContext();
  useEffect(() => {
    console.log("current user", currentUser);
    console.log(currentUser);
  }, []);
  return (
    <>
      {currentUser ? (
        <Navigate to='/homepage'></Navigate>
      ) : (
        <Container
          disableGutters
          maxWidth="false"
          sx={{
            height: "100%",
            flexDirection: "column",

          }}
          classes={{ root: "displayFlexCentered" }}
        >
          <Box className="autentication__container" >
            <Outlet />
            <AuthNavigation />
          </Box>
        </Container>
      )}
    </>
  );
};

export default Auth;
