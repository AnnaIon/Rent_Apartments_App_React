import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

// Assumes these functions are defined elsewhere and imported here
import { successful, failed } from "../Utils/InputsValidations"; 
/**
 * Signs in a user with Firebase Authentication.
 * 
 * @param {Object} userData - The user login data
 * @param {string} userData.email - User's email address
 * @param {string} userData.password - User's password
 
 */
const signIn = async (userData) => {
  const { email, password } = userData;
  try {
    // Attempt to sign in with Firebase Authentication
    await signInWithEmailAndPassword(auth, email, password);

    // Show success toast
    successful("Login successful");

    return { success: true };
  } catch (error) {
    // Log the error for debugging
    console.error("Error signing in:", error);

    // Show error toast
    failed("Incorrect email or password");

    return { success: false, error };
  }
};

export { signIn };
