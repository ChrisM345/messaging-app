import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export default function App() {
  // Access the current authenticated user from the AuthContext
  const { user } = useAuth();
  const navigate = useNavigate();

  // Handle logout: clear localStorage, navigate to login, and reload page
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="bg-neutral-300 p-3 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Messenger App</h1>

        {/* Show username and logout button only if user is authenticated */}
        {user && (
          <>
            <span className="text-sm text-gray-700">
              Logged in as <strong>{user.username}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="mt-1 bg-indigo-700 text-white p-2 rounded-md hover:bg-indigo-400 transition"
              type="submit"
            >
              Logout
            </button>
          </>
        )}
      </header>
      <div className="">
        <main className="">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
