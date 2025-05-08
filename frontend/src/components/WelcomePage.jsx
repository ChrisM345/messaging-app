import { useState } from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value.trim());
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value.trim());
  };

  return (
    <>
      <div className="flex-col text-center items-center">
        <h2>Log In</h2>
        <form className="">
          <label className="block">Username</label>
          <input
            onChange={handleUsernameChange}
            className="border rounded-md w-4/6 mt-1 p-1 text-center"
            value={username}
            type="text"
          />

          <label className="block">Password</label>
          <input
            onChange={handlePasswordChange}
            className="border rounded-md w-4/6 mt-1 p-1 text-center"
            value={password}
            type="password"
          />
          <button
            className="mt-1 w-4/6 bg-indigo-700 text-white p-2 rounded-md hover:bg-indigo-400 transition"
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="mt-10">
          <Link
            to="/signup"
            className="mt-1 w-4/6 bg-indigo-700 text-white p-2 rounded-md hover:bg-indigo-400 transition block mx-auto text-center"
          >
            Create Account
          </Link>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
