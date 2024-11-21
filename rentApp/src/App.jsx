
import Container from "@mui/material/Container";
import { ToastContainer } from "react-toastify";

import { useAuth } from "./context/AuthContext";

import Headers from './Components/Header/Headers';
import { useEffect, useState } from "react";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';


const App = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            const fetchUserData = async () => {
                try {
                    const userDoc = doc(db, 'users', user.uid);
                    const userSnapshot = await getDoc(userDoc);
                    if (userSnapshot.exists()) {
                        const userData = userSnapshot.data();
                        const roleUser = userData.role;
                        setIsAdmin(roleUser === 'admin');
                    } else {
                        setIsAdmin(false); 
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                } finally {
                  setLoading(false); 
              }
            };

            fetchUserData();
        } else {
            setRole(false); 
            setLoading(false); 

        }
    });

    return () => unsubscribe();
}, []);
  return (
    <>
      <Container maxWidth="false" sx={{ height: "100%" }}>
        <Headers isAdmin={isAdmin} loading={loading}/>
        <Outlet context={{ currentUser, setCurrentUser, isAdmin,loading }} />
      </Container>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default App;
