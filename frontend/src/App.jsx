import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="bg-neutral-300 p-3">
        <h1>Messenger App</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
