import { useEffect } from "react";
import { useState } from "react";

const DirectMessagesView = ({ user }) => {
  const [error, setError] = useState("");
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const fetchFriends = async () => {
    try {
      const response = await fetch(`http://localhost:8000/friends?userId=${user.userId}`, {
        method: "GET",
      });
      if (!response.ok) {
        setError("Error fetching friends");
      }

      const data = await response.json();

      const cleanedData = data.map((friend) => {
        const userInfo = friend.senderId === user.userId ? friend.receiver : friend.sender;
        return {
          ...userInfo, // spreads username, email, etc.
          friendId: friend.id, // this is the ID of the friend record
        };
      });
      setFriends(cleanedData);
    } catch {
      setError("Failed to fetch friends");
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <>
      {error != "" && <div className="errorSection">Error: {error}</div>}
      <div className="flex min-h-screen">
        <div className="w-64 bg-gray-100 p-2 border-r border-gray-300 min-h-screen">
          <div className="space-y-2">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center bg-white p-3 rounded-lg shadow border border-gray-200 hover:bg-blue-100 transition-colors"
                onClick={() => setSelectedFriend(friend.username)}
              >
                <ul>
                  <li className="text-lg font-semibold">{friend.username}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex p-6">
          {selectedFriend == null ? <></> : <h2>Direct Messages With {selectedFriend}</h2>}
        </div>
      </div>
    </>
  );
};

export default DirectMessagesView;
