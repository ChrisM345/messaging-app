import { useEffect, useState, useRef } from "react";

const DirectMessagesView = ({ user }) => {
  const [error, setError] = useState("");
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

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

  const handleMessageChange = (e) => {
    const el = e.target;

    // Update message state first
    setMessage(el.value);

    // Reset height to minHeight to allow shrink
    el.style.height = "40px";

    // Then grow to fit content (scrollHeight includes padding)
    el.style.height = `${el.scrollHeight}px`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (message.trim() === "") return;
    console.log(message);
    console.log(user);
    console.log(selectedFriend);
    try {
      const response = await fetch("http://localhost:8000/message/send", {
        method: "POST",
        body: JSON.stringify({
          senderId: user.userId,
          receiverName: selectedFriend,
          content: message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        setError("Failed to send message");
      }
    } catch {
      setError("Failed to send message");
    }
    setMessage("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px";
    }
  };

  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar - Friends list */}
        <div className="w-64 bg-gray-100 p-2 border-r border-gray-300 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Friends</h2>
          <div className="space-y-2">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center bg-white p-3 rounded-lg shadow border border-gray-200 hover:bg-blue-100 transition-colors cursor-pointer"
                onClick={() => setSelectedFriend(friend.username)}
              >
                <ul>
                  <li className="text-lg font-semibold">{friend.username}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Main chat panel */}
        <div className="flex flex-col bg-white flex-1">
          {/* Header */}
          <div className="border-b border-gray-300 p-4">
            {selectedFriend ? (
              <h2 className="text-xl font-semibold">Direct Messages with {selectedFriend}</h2>
            ) : (
              <h2 className="text-lg text-gray-500">Select a friend to start chatting</h2>
            )}
          </div>

          {/* Chat content and input */}
          <div className="flex flex-col" style={{ height: "calc(100vh - 240px)" }}>
            {error !== "" && <div className="errorSection">Error: {error}</div>}
            {/* Messages container */}
            <div className="overflow-y-auto p-6 space-y-4" style={{ flex: 1 }}>
              <h2>Message 1</h2>
              <h2>Message 2</h2>
              <h2>Message 3</h2>
              {/* Replace with real messages */}
            </div>

            {/* Input form */}
            <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t border-gray-200 bg-gray-50 items-end">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={handleMessageChange}
                placeholder="Type a message..."
                className="flex-1 resize-none border border-gray-300 rounded px-3 py-2"
                style={{
                  minHeight: "40px",
                  maxHeight: "150px",
                  overflowY: "auto",
                }}
                rows={1}
              />
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DirectMessagesView;
