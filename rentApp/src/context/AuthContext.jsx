import { onAuthStateChanged } from "firebase/auth";
import {
  useContext,
  createContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../../firebase";

// Create a context to hold authentication state
const AuthContext = createContext(null);

// Custom hook to consume AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component that wraps your app and provides user authentication state
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Holds the current user
  const [loading, setLoading] = useState(true); // Loading state to avoid flashing UI

  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("USER INSIDE THE USE EFFECT", user);
      setCurrentUser(user); // Update state with the logged-in user
      setLoading(false);    // Turn off loading after auth state is resolved
    });

    // Cleanup the subscription on unmount
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {/* Render children only after loading finishes to prevent flickering */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
