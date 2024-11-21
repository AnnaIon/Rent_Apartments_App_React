import { useEffect, useState } from "react";
import User from "../../Components/User";
import { retrieveAllUsers } from "../../../firebase";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      setUsers(await retrieveAllUsers());
    };
    getUsers();
  }, []);
  return (
    <>
      {users.length > 0 ? users.map((user) => <User userData={user} />) : null}
    </>
  );
};

export default AllUsers;
