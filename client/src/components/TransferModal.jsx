import { useState } from "react";
import { transferMoney } from "../api/user.js";
import { toast, ToastContainer } from "react-toastify";

const TransferModal = ({ user, onClose }) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransfer = async () => {
    if (!amount || amount <= 0) {
      alert("Enter valid amount");
      return;
    }

    setLoading(true);

    const res = await transferMoney(Number(amount), user._id);

    setLoading(false);

    if (!res.success) {
      toast("Transfer failed");
      return;
    }

    toast("Transfer successful!");
    onClose();
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white text-black w-100 rounded-xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Send Money</h2>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-lg">
            {user.username[0].toUpperCase()}
          </div>

          <span className="text-lg font-semibold">{user.username}</span>
        </div>

        <label className="block mb-1 font-medium">Amount (in Rs)</label>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg mb-4"
        />

        <button
          onClick={handleTransfer}
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          {loading ? "Sending..." : "Initiate Transfer"}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TransferModal;
