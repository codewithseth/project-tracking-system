import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { getAllUsers } from "../api/user";

const User = () => {
  const { users, setUsers } = useUser();

  const fetchUsers = async () => {
    const response = await getAllUsers();
    console.log(response);
    if (response) {
      setUsers(response);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.username}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default User;
