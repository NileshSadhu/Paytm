import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BalanceCard from "../components/BalanceCard";
import UserList from "../components/UserList";
import TransferModal from "../components/TransferModal";
import { fetchBalance } from "../api/user.js";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const loadBalance = async () => {
      const res = await fetchBalance();
      if (res.success) setBalance(res.data.balance);
    };

    loadBalance();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* blur wrapper */}
      <div className={selectedUser ? "blur-sm pointer-events-none" : ""}>
        <Navbar />
        <BalanceCard balance={balance} />
        <UserList onSend={setSelectedUser} />
      </div>

      {/* modal */}
      {selectedUser && (
        <TransferModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
