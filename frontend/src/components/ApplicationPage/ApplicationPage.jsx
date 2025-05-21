import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import Sidebar from "./Sidebar";
import FriendsView from "./FriendsView";
import FriendRequestsView from "./FriendRequestsView";
import DirectMessagesView from "./DirectMessagesView";

const ApplicationPage = () => {
  const [selectedView, setSelectedView] = useState("home");
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

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
            <Sidebar setSelectedView={setSelectedView} />
            <div className="flex-1 p-6">
              <div className="bg-neutral-200 p-4 rounded mb-4 shadow">
                <h2 className="text-lg font-semibold capitalize">{selectedView.replace(/([A-Z])/g, " $1")}</h2>
              </div>
              <div className="main-content flex-1">
                {selectedView === "home" && <h1>Welcome to the app!</h1>}
                {selectedView === "friends" && <FriendsView user={user} />}
                {selectedView === "friendRequests" && <FriendRequestsView userId={user.userId} />}
                {selectedView === "directMessages" && <DirectMessagesView />}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ApplicationPage;
