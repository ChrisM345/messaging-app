import { Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export default function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="bg-neutral-300 p-3 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Messenger App</h1>
        {user && (
          <span className="text-sm text-gray-700">
            Logged in as <strong>{user.username}</strong>
          </span>
        )}
      </header>
      <div className="flex">
        <main className="flex flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
