import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";

import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Homepage from "../Pages/Homepage/Homepage";
import MyProfile from "../Pages/MyProfile/MyProfile";
import Favourites from "../Pages/Favourites/Favourites";
import MyFlats from "../Pages/MyFlats/MyFlats";
import Auth from "../authentication/Auth";
import AdminRoute from "./AdminRoute";
import AllUsers from "../Pages/AllUsers/AllUsers";
import Inbox from "../Pages/Inbox/Inbox";

const routesArray = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/authentication" />,
      },
      {
        path: "authentication",
        element: <Auth />,
        children: [
          {
            index: true,
            element: <Navigate to="login" />,
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
        element: <AdminRoute />,
        children: [
          {
            path: "",
            element: <AllUsers />,
          },
        ],
      },
    ],
  },
];

const Routes = createBrowserRouter(routesArray);

export default Routes;
