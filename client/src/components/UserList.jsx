import { useEffect, useState } from "react";
import { searchUsers } from "../api/user";
import UserRow from "./UserRow";
import TransferModal from "./TransferModal";

const UserList = ({ onSend }) => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await searchUsers(filter);
      if (res.success) setUsers(res.data);
    };

    fetchUsers();
  }, [filter]);

  return (
    <div className="px-6 mt-4">
      <h3 className="text-lg font-semibold mb-3">Users</h3>

      <input
        placeholder="Search users..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full bg-black border border-neutral-700 px-3 py-2 rounded-lg mb-4"
      />

      <div className="space-y-2">
        {users
          .filter((u) => u._id !== currentUserId)
          .map((u) => (
            <UserRow key={u._id} user={u} onSend={onSend} />
          ))}
      </div>
    </div>
  );
};

export default UserList;
