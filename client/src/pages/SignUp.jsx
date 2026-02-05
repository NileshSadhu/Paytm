import { useState } from "react";
import CustomInputs from "../components/CustomInput";
import CustomBtn from "../components/CustomBtn";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { signUpCall } from "../api/auth.js";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!username || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    const response = await signUpCall(username, email, password);

    if (!response?.success) {
      toast.error("Sign up failed");
      return;
    }

    toast.success("Account created!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-xl p-8 shadow-lg">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-2">Sign Up</h1>
        <p className="text-neutral-400 mb-6">
          Enter your information to create an account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-neutral-300">
              Username
            </label>
            <CustomInputs
              type="text"
              value={username}
              placeholder="nilesh"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

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

          <CustomBtn label="Create Account" />
        </form>

        {/* Footer */}
        <p className="mt-6 text-sm text-neutral-400 text-center">
          Already have an account?{" "}
          <Link to="/SignIn" className="underline hover:text-neutral-300">
            Login
          </Link>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default SignUp;
