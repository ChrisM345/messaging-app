import { useState } from "react";

const FriendsView = ({ user }) => {
  console.log(user);
  const [error, setError] = useState("");
  const [searchUsername, setSearchUsername] = useState("");

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
  return (
    <>
      <h1>Add Friend</h1>
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
      <h1>Here are your friends</h1>
    </>
  );
};

export default FriendsView;
