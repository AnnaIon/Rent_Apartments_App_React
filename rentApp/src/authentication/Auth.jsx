import { Outlet, useOutletContext, Navigate } from "react-router-dom";
import AuthNavigation from "../authentication/Navigation";
import { Container, Box } from "@mui/material";
import { useEffect } from "react";

/**
 * Auth Component
 * Handles the authentication layout and redirection logic.
 * Shows login/register form if the user is not authenticated,
 * otherwise redirects to the homepage.
 */
const Auth = () => {
  const { currentUser } = useOutletContext(); // Get current user from context

  useEffect(() => {
    // Log current user for debugging purposes
    console.log("current user", currentUser);
  }, []);

  // If user is already authenticated, redirect them to the homepage
  if (currentUser) {
    return <Navigate to="/homepage" />;
  }

  return (
    <Container
      disableGutters
      maxWidth="false"
      sx={{
        height: "100%",
        flexDirection: "column",
      }}
      classes={{ root: "displayFlexCentered" }} // Applies custom flex styling
    >
      <Box className="autentication__container">
        <Outlet /> {/* Renders either Login or Register */}
        <AuthNavigation /> {/* Bottom navigation for auth pages */}
      </Box>
    </Container>
  );
};

export default Auth;
