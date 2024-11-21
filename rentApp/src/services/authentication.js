import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const signIn = async (userData) => {
  const { email, password } = userData;
  console.log(email, password);
  try {
    await signInWithEmailAndPassword(auth, email, password);

    succesful("Login succesful");

    return { success: true };
  } catch (error) {
    console.error("Error signing in: ", error);
    failed("Incorrect email or password");
  }
};

export { signIn, succesful, failed };
