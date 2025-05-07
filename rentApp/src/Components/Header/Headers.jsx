import { NavLink, useOutletContext, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Header.module.css";

// Firebase imports
import { auth, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

// App-specific context
import { useAuth } from "../../context/AuthContext";

// MUI Icons
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ApartmentIcon from "@mui/icons-material/Apartment";
import InboxIcon from "@mui/icons-material/Inbox";
import GroupsIcon from "@mui/icons-material/Groups";

// App logo
import logo from "../../assets/gold_logo.png";

const Headers = ({ loading, isAdmin }) => {
  const [userData, setUserData] = useState(null);       // Store user profile data
  const [isLoading, setIsLoading] = useState(true);     // Control loading spinner for user data

  const navigate = useNavigate();
  const { currentUser } = useAuth();                    // Authenticated user from context

  // Fetch user data from Firestore once currentUser is available
  useEffect(() => {
    if (!currentUser) return;
    fetchUserData(currentUser);
  }, []);

  // Retrieve user document by UID from Firestore
  const fetchUserData = async (user) => {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const finalUserData = userDoc.data();
      setUserData(finalUserData);
    }

    setIsLoading(false);
  };

  // Handle logout and redirect to login page
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/authentication/login");
    } catch (error) {
      console.log("Error logging out", error);
    }
  };

  // Redirect to login if no current user is found
  if (!currentUser) {
    return <Navigate to="/authentication" />;
  }

  return (
    <div className={styles.header}>
      {/* Logo */}
      <img src={logo} alt="App logo" />

      {/* Welcome message */}
      <div>
        Hello,
        <span className={styles.username_color}>
          {isLoading ? "Loading..." : userData?.firstName ?? "Guest"}
        </span>
      </div>

      {/* Navigation bar */}
      <nav>
        <ul>
          <li><NavLink to="/homepage"><HomeIcon /></NavLink></li>
          <li><NavLink to="/myprofile"><AccountCircleIcon /></NavLink></li>
          <li><NavLink to="/myflats"><ApartmentIcon /></NavLink></li>
          <li><NavLink to="/favourites"><FavoriteIcon /></NavLink></li>
          <li><NavLink to="/inbox"><InboxIcon /></NavLink></li>
          {isAdmin && (
            <li><NavLink to="/all-users"><GroupsIcon /></NavLink></li>
          )}
        </ul>
      </nav>

      {/* Logout button */}
      <div className={styles.logout_btn}>
        <LogoutIcon onClick={handleLogout} titleAccess="Logout" />
      </div>
    </div>
  );
};

export default Headers;
