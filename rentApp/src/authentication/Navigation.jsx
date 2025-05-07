import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { yellow } from "@mui/material/colors";
import { lime } from "@mui/material/colors";

// Array of route configurations for the bottom navigation
const Routes = [
  { label: "Login", icon: <LoginIcon />, path: "login" },
  { label: "Register", icon: <AppRegistrationIcon />, path: "register" },
];

/**
 * Navigation Component
 * Renders a bottom navigation bar for authentication routes (Login/Register).
 * Automatically highlights the current route based on location.
 */
const Navigation = () => {
  const [value, setValue] = useState(0); // Index of the selected tab
  const navigate = useNavigate();        // React Router navigation
  const location = useLocation();        // Access current URL path

  // Sync selected tab with current URL path on component mount/update
  useEffect(() => {
    const routeIndex = Routes.findIndex((route) =>
      location.pathname.includes(route.path)
    );
    if (routeIndex !== -1) {
      setValue(routeIndex); // Set the correct tab index
    }
  }, [location.pathname]);

  // Handle tab change and navigate to corresponding route
  const handleChange = (e, newValue) => {
    setValue(newValue);
    navigate(`${Routes[newValue].path}`);
  };

  return (
    <Box
      className="autentication__navigation__container"
      sx={{
        backgroundColor: yellow[200],
        color: lime[900],
      }}
    >
      <BottomNavigation showLabels value={value} onChange={handleChange}>
        {Routes.map((route) => (
          <BottomNavigationAction
            key={route.path}
            label={route.label}
            icon={route.icon}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
};

export default Navigation;
