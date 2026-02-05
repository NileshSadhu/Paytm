import { useState } from "react";
import CustomInputs from "../components/CustomInput";
import CustomBtn from "../components/CustomBtn";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { signInCall } from "../api/auth.js";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!email && !password) {
      toast.error("Both fields are required");
      return;
    }

    if (!email) {
      toast.error("Email is required");
      return;
    }

    if (!password) {
      toast.error("Password is required");
      return;
    }

    const response = await signInCall(email, password);
    console.log(response);
    if (!response?.success) {
      toast.error("Login failed");
      return;
    }

    toast.success("Login successful!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-xl p-8 shadow-lg">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-2">Sign In</h1>
        <p className="text-neutral-400 mb-6">
          Enter your credentials to access your account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-neutral-300">Email</label>
            <CustomInputs
              type="email"
              value={email}
              placeholder="nilesh@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-neutral-300">
              Password
            </label>
            <CustomInputs
              type="password"
              value={password}
              placeholder="8 characters"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <CustomBtn label="Submit" />
        </form>

        {/* Footer */}
        <p className="mt-6 text-sm text-neutral-400 text-center">
          Don’t have an account?{" "}
          <Link
            to="/SignUp"
            className="text-white underline hover:text-neutral-300"
          >
            Sign Up
          </Link>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default SignIn;
