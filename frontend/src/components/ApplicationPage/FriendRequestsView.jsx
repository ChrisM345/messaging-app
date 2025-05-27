import { useEffect, useState } from "react";
const FriendRequestsView = ({ userId }) => {
  const [receivedFriendRequests, setReceivedFriendRequests] = useState([]);
  const [sentFriendRequests, setSentFriendRequests] = useState([]);
  const [error, setError] = useState("");
  const [version, setVersion] = useState(0);

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  const fetchFriendRequests = async () => {
    try {
      const [receivedReq, sentReq] = await Promise.all([
        fetch(`http://localhost:8000/friendRequests/received?userId=${userId}`, {
          method: "GET",
        }),
        fetch(`http://localhost:8000/friendRequests/sent?userId=${userId}`, {
          method: "GET",
        }),
      ]);

      if (!receivedReq.ok || !sentReq.ok) {
        setError("Error fetching friend requests");
      }

      const [receivedRequests, sentRequests] = await Promise.all([receivedReq.json(), sentReq.json()]);

      setReceivedFriendRequests(receivedRequests);
      setSentFriendRequests(sentRequests);
    } catch {
      setError("Error fetching friend requests");
    }
  };

  const handleFriendRequest = async (requestId, action) => {
    try {
      const response = await fetch("http://localhost:8000/friendRequests/respond", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId, action }),
      });

      if (!response.ok) {
        throw new Error("Failed to respond to request");
      }
      await fetchFriendRequests();
      setVersion((v) => v + 1);
    } catch {
      setError("Failed to update friend request");
    }
  };

  return (
    <>
      <div className="space-y-8">
        {/* Received Requests */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Friend Requests Received</h2>
          <div className="space-y-3">
            {receivedFriendRequests.length > 0 ? (
              receivedFriendRequests.map((request) => (
                <div key={request.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                  <p className="text-gray-800">
                    <span className="font-semibold">{request.sender.username}</span> sent you a friend request.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleFriendRequest(request.id, "accepted")}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleFriendRequest(request.id, "declined")}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No friend requests received.</p>
            )}
          </div>
        </div>

        {/* Sent Requests */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Friend Requests Sent</h2>
          <div className="space-y-3">
            {sentFriendRequests.length > 0 ? (
              sentFriendRequests.map((request) => (
                <div key={request.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                  <p className="text-gray-800">
                    You sent a friend request to <span className="font-semibold">{request.receiver.username}</span>.
                  </p>
                  <button
                    onClick={() => handleFriendRequest(request.id, "cancel")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Cancel Request
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No friend requests sent.</p>
            )}
          </div>
        </div>
        {error != "" && <div className="errorSection">Error: {error}</div>}
      </div>
    </>
  );
};

export default FriendRequestsView;
