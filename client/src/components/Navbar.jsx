import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/signIn");
  }

  return (
    <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-800">
      <h1 className="text-xl font-bold">Payments App</h1>

      <div className="flex items-center gap-3">
        <Link
          to="/change-password"
          className="bg-white text-black py-2 px-3 rounded-lg"
        >
          Change Password
        </Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
