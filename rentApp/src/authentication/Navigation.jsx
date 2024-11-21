import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { useEffect, useState } from "react"
import { useNavigate,useLocation } from "react-router-dom";

import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { yellow } from '@mui/material/colors';
import { lime  } from '@mui/material/colors';


const Routes = [
    {label: 'Login' , icon : <LoginIcon/>, path : "login"},
    {label: 'Register' , icon : <AppRegistrationIcon/>, path : "register"},
]


const Navigation = () => {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const routeIndex =  Routes.findIndex((route) => location.pathname.includes(route.path));
        if (routeIndex !== -1){
            setValue(routeIndex);
        }
    }, [location.pathname]);

    const handleChange = ( e, newValue) => {
        setValue(newValue);
        navigate(`${Routes[newValue].path}`);
    };
  return (
    <Box className="autentication__navigation__container" sx={{ backgroundColor: yellow[200] ,  color: lime[900] }}>
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
  )
}

export default Navigation