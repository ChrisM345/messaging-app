import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (location.state && location.state.error) {
      setError(location.state.error);
    }
  }, [location.state]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value.trim());
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value.trim());
  };

  const handleNavigate = () => {
    navigate(`/MessagingApp/Account/${username}`);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        setError(await response.text());
      } else {
        const { token, message, username } = await response.json();
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        alert(message);
        handleNavigate();
      }
    } catch {
      setError("Error Fetching Backend");
    }
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
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
        {error != "" && <div className="errorSection">Error: {error}</div>}
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
