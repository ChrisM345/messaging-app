import { useEffect } from "react";
import { useState } from "react";

const FriendsView = ({ user }) => {
  const [error, setError] = useState("");
  const [searchUsername, setSearchUsername] = useState("");
  const [friends, setFriends] = useState([]);

  const handleSearchUsername = (e) => {
    setSearchUsername(e.target.value.trim());
  };

  const handleAddFriend = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/sendFriendRequest", {
        method: "POST",
        body: JSON.stringify({
          userId: user.userId,
          friendUsername: searchUsername,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        setError(await response.text());
      } else {
        alert(await response.text());
        // handleNavigate();
      }
    } catch {
      setError("Error Fetching Backend");
    }
  };

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

  const handleRemoveFriend = async (requestId) => {
    const action = "delete";
    try {
      const response = await fetch("http://localhost:8000/friendRequests/respond", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId, action }),
      });

      if (!response.ok) {
        setError("Failed to respond to request");
      }
      await fetchFriends();
    } catch {
      setError("Failed to update friend request");
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <>
      <h1 className="text-xl font-semibold mb-4">Add Friend</h1>
      <h2>You can add friends with their username</h2>
      <div className="flex items-center gap-2">
        <input
          onChange={handleSearchUsername}
          className="border rounded-md w-4/6 mt-1 p-1 text-center"
          value={searchUsername}
          type="text"
          placeholder="You can add friends with their username."
        />
        <button
          className="mt-1 bg-indigo-700 text-white p-2 rounded-md hover:bg-indigo-400 transition"
          type="submit"
          onClick={handleAddFriend}
        >
          Add Friend
        </button>
      </div>
      {error != "" && <div className="errorSection">Error: {error}</div>}
      <h2 className="text-xl font-semibold mb-4 my-4">Friends List</h2>
      <div className="space-y-3">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow border border-gray-200"
            >
              <p>{friend.username}</p>
              <button
                onClick={() => handleRemoveFriend(friend.friendId)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Remove Friend
              </button>
            </div>
          ))
        ) : (
          <h2>No Friends Yet!</h2>
        )}
      </div>
    </>
  );
};

export default FriendsView;
