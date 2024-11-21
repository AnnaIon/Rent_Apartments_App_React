import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  deleteUser
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
  updateDoc,
  addDoc,
  deleteDoc,
  
} from "firebase/firestore";
import { successful, failed } from "./src/Utils/InputsValidations";

const firebaseConfig = {
  apiKey: "AIzaSyCZFw_qspCXK7-2k3LCDLXgHHrzt4Hx7bU",
  authDomain: "apartementsapp.firebaseapp.com",
  projectId: "apartementsapp",
  storageBucket: "apartementsapp.appspot.com",
  messagingSenderId: "592179684594",
  appId: "1:592179684594:web:263a84a6e2db6aa3455c6b",
  measurementId: "G-18MR8NKL8L",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function userRegistration(
  email,
  password,
  dateOfBirth,
  firstName,
  lastName
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    const uid = user.uid;

    const userDocRef = doc(db, "users", user.uid);

    await setDoc(userDocRef, {
      uid: uid,
      email: email,
      password: password,
      dateOfBirth: dateOfBirth,
      firstName: firstName,
      lastName: lastName,
      role: "user",
      createdAt: new Date(),
      flats: [],
      favourite: [],
    });

    return true;
  } catch (exception) {
    console.error("Error adding user:", exception);
    return false;
  }
}

async function emailAlreadyTaken(email) {
  try {
    const usersRef = collection(db, "users");
    let usersQuery = query(usersRef, where("email", "==", email));
    let users = await getDocs(usersQuery);

    return !users.empty;
  } catch (exception) {
    console.error("Error retrieving users", exception);
  }
}

async function getUserData(userId) {
  try {
    const userDocRef = doc(db, "users", userId); 
        const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data(); 
    }
    return null;
  } catch (exception) {
    console.error("Error retrieving user", exception);
    return null;
  }
}

const signIn = async (userData) => {
  const { email, password } = userData;
  try {
    await signInWithEmailAndPassword(auth, email, password);

    successful("Login successful");

    return { success: true };
  } catch (error) {
    console.error("Error signing in: ", error);
    failed("Incorrect email or password");
    return { success: false };
  }
};

const getFlats = async (user) => {
  try {
    if (user) {
      const userRef = doc(db, "users", user.uid); 
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const flats = flatDoc.data()?.flats; 
      }
    }
    return [];
  } catch (exception) {
    console.error(exception);
  }
};

const fetchFlatsData = async (currentUser, isHomepage) => {
  let allFlats = {};

  if (currentUser) {
    const flatsColection = doc(db, "users", currentUser.uid); 
    const flatDoc = await getDoc(flatsColection); 

    if (flatDoc.exists()) {
      const finalFlatData = flatDoc.data(); 
      const flatArr = finalFlatData?.flats; 

      if (isHomepage) {
        const flatsColection = collection(db, "users"); 
        const flatDoc = await getDocs(flatsColection); 

        flatDoc.forEach((flat) => {
          let userId = flat.data().uid;
          const flatData = flat.data().flats; 
          if (
            flatData != null &&
            flatData != undefined &&
            flatData.length > 0
          ) {
         
            allFlats[userId] = flatData; 
          }
        });
        return allFlats; 
      }

      if (flatArr != null && flatArr != undefined && flatArr.length > 0) {
        allFlats[currentUser.uid] = flatArr; 
      }
      return allFlats; 
    }
  }
};

const deleteFlat = async (userId, flatId) => {
  if (userId) {
    let flatsCollectionRef = doc(db, "users", userId); 
    const flatsCollection = await getDoc(flatsCollectionRef); 

    if (flatsCollection.exists()) {
      let flats = flatsCollection.data().flats; 
      const updatedFlatsList = flats.filter((flat) => flat.id !== flatId); 
      await updateDoc(flatsCollectionRef, { flats: updatedFlatsList }); 
      return updatedFlatsList; 
    }
  }
};

const favouriteFlat = async (user, flat, isFavourite) => {
  if (user) {
    const flatsCollectionRef = doc(db, "users", user.uid); 
    const flatsColection = await getDoc(flatsCollectionRef); 

    if (flatsColection.exists()) {
      let userData = flatsColection.data(); 
      let favourites = userData.favourite ?? []; 

      if (isFavourite) {
        favourites.push(flat); 
      } else {
        if (favourites.length > 0) {
          favourites = favourites.filter((x) => x.id !== flat.id); 
        }
      }

      userData.favourite = favourites; 
      await updateDoc(flatsCollectionRef, userData); 
    }
  }
};

const getFavouriteFlats = async (user) => {
  const userRef = doc(db, "users", user.uid); 
  const userSnap = await getDoc(userRef); 

  if (userSnap.exists()) {
    const flats = userSnap.data().favourite || []; 

    return flats; 
  }
};

const getUserProfileData = async (user) => {
  const userRef = doc(db, "users", user.uid); 
  const userSnap = await getDoc(userRef); 
  let userData = {}; 

  if (userSnap.exists()) {
    const data = userSnap.data() || []; 
    userData = {
      email: data.email,
      password: data.password, 
      firstName: data.firstName,
      lastName: data.lastName, 
      birthDate: data.dateOfBirth, 
  }
}
  return userData; 
};

const updateUserData = async (user, userData) => {
  try {
    console.log("Inside update user"); 
    console.log(user); 
    console.log(userData); 
    let id =
      userData.id == null || userData.id == undefined ? user.uid : userData.id;
    const userRef = doc(db, "users", id); 
    const userSnap = await getDoc(userRef); 

    if (userSnap.exists()) {
      let data = userSnap.data() || []; 
      await updateEmailOrPassword(data, userData); 
      if (userData["password"]) {
        data["password"] = userData.password;
      }
      data["email"] = userData["email"]; 
      data["firstName"] = userData["firstName"]; 
      data["lastName"] = userData["lastName"]; 
      data["dateOfBirth"] = userData["birthDate"]; 
      console.log(userData);
      await updateDoc(userRef, data); 

      successful("Successfully Updated"); 
    }
  } catch (error) {
    console.error(error); 
    failed("Something went wrong"); 
  }
};
const updateFlatData = async (user, flatData) => {
  try {
    console.log("Inside update user");
    console.log(user); 
    console.log(flatData); 
    let id = user.uid;
    const userRef = doc(db, "users", id); 
    const userSnap = await getDoc(userRef); 

    if (userSnap.exists()) {
      let data = userSnap.data() || [];

      const updatedFlat = data.flats.map((flat) => {
        return flat.id == flatData.id ? { flatData } : flat;
      });

      await updateDoc(userRef, {
        flats: updatedFlat,
      });

      successful("Successfully Updated"); 
    }
  } catch (error) {
    console.error(error); 
    failed("Something went wrong"); 
  }
};


const saveMessage = async (newMessage) => {
  try {
    console.log(newMessage);

    const messagesCollectionRef = collection(db, "messages");

    await addDoc(messagesCollectionRef, newMessage);

    console.log("Message successfully saved!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};
  

const sendMessage = async (
  flatId,
  messageText,
  userIdFrom = null,
  messageDocId = null
) => {
  const user = auth.currentUser;

  if (user) {
    const userId = user.uid;

    const userRef = doc(db, "users", userId);

    const userDoc = await getDoc(userRef);

    const firstName = userDoc.data().firstName;

    if (userIdFrom == null) {
      userIdFrom = await retrieveUserByFlatId(flatId);
    }

    const msg = {
      userIdTo: userIdFrom, 
      userIdFrom: userId, 
      message: messageText, 
      flatId: flatId, 
      userNameFrom: firstName, 
      creationDate: new Date(), 
      answered: false, 
    };

    await saveMessage(msg);

    if (messageDocId != null) {
      const messageRef = doc(db, "messages", messageDocId);

      const messageSnap = await getDoc(messageRef);

      if (messageSnap.exists()) {
        const data = messageSnap.data();

        data["answered"] = true;

        await updateDoc(messageRef, data);
      }
    }
  }
};

const retrieveUserByFlatId = async (flatId) => {
  const usersRef = collection(db, "users");

  const userDocs = await getDocs(usersRef);

  for (const userDoc of userDocs.docs) {
    const flats = userDoc.data().flats;

    if (flats && flats.length > 0) {
      for (let flat of flats) {
        console.log(flat.id == flatId, flat.id, flatId);

        if (flat.id == flatId) {
          return userDoc.id;
        }
      }
    }
  }
  return null;
};

const getMessages = async () => {
  const user = auth.currentUser;

  let messages = [];

  if (user) {
    const messagesCollectionRef = collection(db, "messages");

    const q = query(
      messagesCollectionRef,
      where("userIdTo", "==", user.uid),
      where("answered", "==", false)
    );

    const querySnapshot = await getDocs(q);

    console.log(querySnapshot);

    for (let doc of querySnapshot.docs) {
      let message = doc.data();

      let messageObj = { ...message, id: doc.id };

      messages.push(messageObj);
    }
  }
  return messages;
};

const updateEmailOrPassword = async (userSnap, userUpdatedData) => {
  let user = auth.currentUser;

  if (!user) return;

  if (userSnap["email"] !== userUpdatedData["email"]) {
    await updateEmail(user, userUpdatedData["email"]);
  }

  if (userSnap["password"] !== userUpdatedData["password"]) {
    await updatePassword(user, userUpdatedData["password"]);
  }
};

const retrieveAllUsers = async () => {
  try {
    const usersRef = collection(db, "users");

    const snapshot = await getDocs(usersRef);

    const users = snapshot.docs.map((doc) => {
      let userData = doc.data();
      let userObj = {};

      userObj["firstName"] = userData["firstName"];
      userObj["lastName"] = userData["lastName"];
      userObj["birthDate"] = userData["dateOfBirth"];
      userObj["email"] = userData["email"];
      userObj["id"] = doc.id;

      return userObj;
    });

    console.log(users);

    return users;
  } catch (error) {
    console.error("Error retrieving users:", error);
    return [];
  }
};

const handleDeleteAccount = async () => {
  try {
    const user = auth.currentUser;

    if (user) {
      const id = user.uid;
      await deleteDoc(doc(db, "users", id));
      await deleteUser(user);
    }
  } catch (error) {
    console.log("Error deleting user", error);
  }
};

export {
  auth,
  db,
  fetchFlatsData,
  deleteFlat,
  favouriteFlat,
  getFavouriteFlats,
  userRegistration,
  emailAlreadyTaken,
  getUserProfileData,
  signIn,
  getFlats,
  updateUserData,
  sendMessage,
  getMessages,
  retrieveAllUsers,
  handleDeleteAccount,
  updateFlatData
};
