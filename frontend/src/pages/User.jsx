import { useEffect, useState } from "react";
import { getAllUsers } from "../api/user";
import { toast } from "react-toastify";
import UserList from "../components/UserList";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchUsers();
  }, []);

  return <UserList users={users} />;
};

export default User;
