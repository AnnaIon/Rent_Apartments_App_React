import { useEffect, useState } from "react";
import User from "../../Components/User";
import { retrieveAllUsers } from "../../../firebase";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users from the database when the component mounts
  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await retrieveAllUsers();
        setUsers(data || []);
      } catch (error) {
        console.error("Failed to retrieve users:", error);
      }
    };
    getUsers();
  }, []);

  return (
    <>
      {users.length > 0 ? (
        users.map((user) => (
          <User key={user.uid || user.id} userData={user} />
        ))
      ) : (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          No users found.
        </p>
      )}
    </>
  );
};

export default AllUsers;
