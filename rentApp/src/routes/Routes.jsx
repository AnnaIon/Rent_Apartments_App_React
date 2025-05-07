import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";

// Pages
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Homepage from "../Pages/Homepage/Homepage";
import MyProfile from "../Pages/MyProfile/MyProfile";
import Favourites from "../Pages/Favourites/Favourites";
import MyFlats from "../Pages/MyFlats/MyFlats";
import Inbox from "../Pages/Inbox/Inbox";
import AllUsers from "../Pages/AllUsers/AllUsers";

// Route guards / wrappers
import Auth from "../authentication/Auth";       // Handles login/register layout
import AdminRoute from "./AdminRoute";           // Protects admin-only routes

// Define route configuration array
const routesArray = [
  {
    path: "/",
    element: <App />, // Root wrapper with <Outlet />, layout, or common UI
    children: [
      {
        index: true,
        element: <Navigate to="/authentication" />, // Redirect root to /authentication
      },
      {
        path: "authentication",
        element: <Auth />, // Renders Auth layout (Login/Register switcher)
        children: [
          {
            index: true,
            element: <Navigate to="login" />, // Default to login page
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
      {
        path: "homepage",
        element: <Homepage />,
      },
      {
        path: "myflats",
        element: <MyFlats />,
      },
      {
        path: "myprofile",
        element: <MyProfile />,
      },
      {
        path: "favourites",
        element: <Favourites />,
      },
      {
        path: "inbox",
        element: <Inbox />,
      },
      {
        path: "all-users",
        element: <AdminRoute />, // Admin-protected route
        children: [
          {
            path: "",
            element: <AllUsers />, // Render user list inside AdminRoute
          },
        ],
      },
    ],
  },
];

// Create the router instance
const Routes = createBrowserRouter(routesArray);

export default Routes;
