import { NavLink, useOutletContext, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { auth, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../../assets/gold_logo.png";
import { KeyboardReturnOutlined } from "@mui/icons-material";
import SortIcon from "@mui/icons-material/Sort";
import IconButton from "@mui/material/IconButton";
import { useAuth } from "../../context/AuthContext";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ApartmentIcon from "@mui/icons-material/Apartment";
import InboxIcon from "@mui/icons-material/Inbox";
import GroupsIcon from "@mui/icons-material/Groups";



const Headers = ({ loading, isAdmin }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [checkAZ, setCheckAZ] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;
    fetchUserData(currentUser);
  }, []);

  const fetchUserData = async (user) => {
    const userDocRef = doc(db, "users", user.uid); //retu unde e documentul
    const userDoc = await getDoc(userDocRef); //ret continut doc
    if (userDoc.exists()) {
      const finalUserData = userDoc.data(); //data e prop din firebase
      setUserData(finalUserData);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/authentication/login");
    } catch (error) {
      console.log("Error logging out", error);
    }
  };
  return (
    <>
      {!currentUser ? (
        <Navigate to="/authentication"></Navigate>
      ) : (
        <div className={styles.header}>
        

          <img src={logo} />
          <div>
            Hello,
            <span className={styles.username_color}>
              {isLoading
                ? "Loading..."
                : `${userData ? `${userData.firstName} ` : "Guest"}`}
            </span>
          </div>
          <nav>
            <ul>
              <li>
                <NavLink to="/homepage">
                  <HomeIcon />
                </NavLink>
              </li>
              <li>
                <NavLink to="/myprofile">
                  <AccountCircleIcon />
                </NavLink>
              </li>
              <li>
                <NavLink to="/myflats">
                  <ApartmentIcon />
                </NavLink>
              </li>
              <li>
                <NavLink to="/favourites">
                  <FavoriteIcon />
                </NavLink>
              </li>
              <li>
                <NavLink to="/inbox">
                  <InboxIcon />
                </NavLink>
              </li>
              {isAdmin ? (
                <li>
                  <NavLink to="/all-users">
                    <GroupsIcon />
                  </NavLink>
                </li>
              ) : (
                ""
              )}
            </ul>
          </nav>
          <div className={styles.logout_btn}>
            <LogoutIcon onClick={() => handleLogout()} />
          </div>
        </div>
      )}
    </>
  );
};

export default Headers;
