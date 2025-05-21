import { useEffect, useState } from "react";
const FriendRequestsView = ({ userId }) => {
  console.log(userId);
  const [receivedFriendRequests, setReceivedFriendRequests] = useState([]);
  const [sentFriendRequests, setSentFriendRequests] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
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
    fetchFriendRequests();
  }, []);
  return (
    <>
      <h1>Friend Requests Received</h1>
      <h1>Friend Requests Sent</h1>
      {error != "" && <div className="errorSection">Error: {error}</div>}
    </>
  );
};

export default FriendRequestsView;
