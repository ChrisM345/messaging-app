import { useState } from "react";
import { useNavigate } from "react-router";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value.trim());
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value.trim());
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value.trim());
    if (password != e.target.value.trim()) {
      setError("Passwords must match");
    } else {
      setError("");
    }
  };

  const handleNavigate = () => {
    navigate("/");
  };

  const isFormValid = username && password && password == confirmPassword;

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/createAccount", {
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
        alert(await response.text());
        handleNavigate();
      }
    } catch {
      setError("Error Fetching Backend");
    }
  };

  return (
    <>
      <div className="flex-col text-center items-center">
        <h2>Sign Up Form</h2>
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
          <label className="block">Confirm Password</label>
          <input
            onChange={handleConfirmPasswordChange}
            className="border rounded-md w-4/6 mt-1 p-1 text-center"
            value={confirmPassword}
            type="password"
          />
          <button
            onClick={handleCreateAccount}
            className="mt-1 w-4/6 bg-indigo-700 text-white p-2 rounded-md hover:bg-indigo-400 transition"
            type="submit"
            disabled={!isFormValid}
          >
            Sign up
          </button>
        </form>
        {error != "" && <div className="errorSection">Error: {error}</div>}
      </div>
    </>
  );
};

export default SignupPage;
