import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ApplicationPage = () => {
  // const [user, setUser] = useState(null);
  const [selectedView, setSelectedView] = useState("home");
  const navigate = useNavigate();

  const { setUser } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/", {
        state: { error: "You must login." },
      });
      return;
    }

    fetch("http://localhost:8000/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid token");
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/", {
          state: { error: "Invalid Token. Please login again." },
        });
      });
  }, []);

  return (
    <>
      {!localStorage.getItem("token") ? (
        <h1>LOADING</h1>
      ) : (
        <>
          <div className="flex w-full">
            {/* Sidebar */}
            <div className="w-64 bg-gray-100 p-4 border-r border-gray-300 min-h-screen">
              <h2 className="text-lg font-semibold mb-4">Navigation</h2>
              <ul className="space-y-2">
                <li className="cursor-pointer hover:text-blue-500" onClick={() => setSelectedView("home")}>
                  Home
                </li>
                <li className="cursor-pointer hover:text-blue-500" onClick={() => setSelectedView("friends")}>
                  Friends
                </li>
                <li className="cursor-pointer hover:text-blue-500" onClick={() => setSelectedView("friendRequests")}>
                  Friend Requests
                </li>
                <li className="cursor-pointer hover:text-blue-500" onClick={() => setSelectedView("directMessages")}>
                  Direct Messages
                </li>
              </ul>
            </div>
            <div className="flex-1 p-6">
              <div className="bg-neutral-200 p-4 rounded mb-4 shadow">
                <h2 className="text-lg font-semibold capitalize">{selectedView.replace(/([A-Z])/g, " $1")}</h2>
              </div>
              <div className="main-content flex-1">
                {selectedView === "home" && <h1>Welcome to the app!</h1>}
                {selectedView === "friends" && <h1>Here are your friends</h1>}
                {selectedView === "friendRequests" && <h1>Pending Friend Requests</h1>}
                {selectedView === "directMessages" && <h1>Direct Messages</h1>}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ApplicationPage;
