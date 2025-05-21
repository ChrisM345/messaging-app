const Sidebar = ({ setSelectedView }) => {
  return (
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
  );
};

export default Sidebar;
