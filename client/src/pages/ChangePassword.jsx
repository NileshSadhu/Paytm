import { useState } from "react";
import CustomInputs from "../components/CustomInput";
import CustomBtn from "../components/CustomBtn";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { changePwdCall } from "../api/auth.js";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!oldPassword || !newPassword) {
      toast.error("Both fields are required");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }

    const response = await changePwdCall(oldPassword, newPassword);

    if (!response?.success) {
      toast.error("Password change failed");
      return;
    }

    toast.success("Password updated!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-xl p-8 shadow-lg">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-2">Change Password</h1>
        <p className="text-neutral-400 mb-6">
          Update your account password securely
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-neutral-300">
              Old Password
            </label>
            <CustomInputs
              type="password"
              value={oldPassword}
              placeholder="Enter old password"
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-neutral-300">
              New Password
            </label>
            <CustomInputs
              type="password"
              value={newPassword}
              placeholder="Minimum 8 characters"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <CustomBtn label="Update Password" />
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ChangePassword;
